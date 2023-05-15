package app.controller;

import app.annotations.Existed;
import app.annotations.New;
import app.dto.rq.UserModelRequest;
import app.enums.TokenType;
import app.exceptions.AuthErrorException;
import app.exceptions.EmailAlreadyRegisteredException;
import app.facade.UserModelFacade;
import app.model.UserModel;
import app.service.JwtTokenService;
import app.service.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.HashMap;
import java.util.Optional;
import java.util.Set;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

  private final UserModelService userService;

  private final JwtTokenService jwtTokenService;

  private final AuthenticationManager authenticationManager;

  private final Validator validator;

  private final UserModelFacade userModelFacade;

  @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HashMap<String, String>> handleLogin(@RequestBody UserModelRequest loginRequest) {
    //RequestDTO validation according to UserDTOValidator settings
    if (this.getValidation(loginRequest, Existed.class).getStatusCode().isError())
      return this.getValidation(loginRequest, Existed.class);

    //Auth procedure handling
    Authentication authentication = authenticationManager
      .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    Object principal = authentication.getPrincipal();

    Optional<User> maybeAuthUser = (principal instanceof User) ? Optional.of((User) principal) : Optional.empty();
    User authUser = maybeAuthUser.orElseThrow(() -> new AuthErrorException("Something went wrong during authentication"));

    //User extraction from DB by security credentials from Authenticated User (email aka username)
    Optional<UserModel> maybeCurrentUser = this.userService.getUser(authUser.getUsername());
    UserModel currentUser = maybeCurrentUser.orElseThrow(() -> new AuthErrorException("Authenticated user not found in DB! MAGIC!"));

    //Token creation
    String accessToken = this.jwtTokenService.createToken(currentUser.getId(), TokenType.ACCESS, currentUser.getUserTag(), currentUser.getEmail());
    String refreshToken = this.jwtTokenService.createToken(currentUser.getId(), TokenType.REFRESH);

    //Update refresh token for current user
    this.jwtTokenService.updateRefreshToken(currentUser, refreshToken);

    //JWT tokens for response packing
    HashMap<String, String> response = new HashMap<>();
    response.put("ACCESS_TOKEN", accessToken);
    response.put("REFRESH_TOKEN", refreshToken);
    response.put("LOGIN_USER_ID", currentUser.getId().toString());

    return ResponseEntity.ok(response);
  }

  @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HashMap<String, String>> handleRegistration(@RequestBody UserModelRequest signUpDTO) {
    //RequestDTO validation according to UserDTOValidator settings
    if (this.getValidation(signUpDTO, New.class).getStatusCode().isError())
      return this.getValidation(signUpDTO, New.class);

    //Email duplicate checking
    if (this.userService.checkEmail(signUpDTO.getEmail()))
      throw new EmailAlreadyRegisteredException("Email: " + signUpDTO.getEmail() + " already taken!");

    //Saving new User to DB and getting user_id to freshUser   //Mapping signUpDTO -> UserModel
    UserModel freshUser = this.userService.save(this.userModelFacade.convertToEntity(signUpDTO));

    //Token creation using user_id
    String accessToken = this.jwtTokenService.createToken(freshUser.getId(), TokenType.ACCESS, freshUser.getUserTag(), freshUser.getEmail());
    String refreshToken = this.jwtTokenService.createToken(freshUser.getId(), TokenType.REFRESH);

    //New user saving to DB with refresh token
    freshUser.setRefreshToken(refreshToken);

    //JWT tokens and UserId for response packing
    HashMap<String, String> response = new HashMap<>();
    response.put("ACCESS_TOKEN", accessToken);
    response.put("REFRESH_TOKEN", refreshToken);
    response.put("NEW_USER_ID", this.userService.save(freshUser).getId().toString());

    return ResponseEntity.ok(response);
  }

  @GetMapping(path = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> handleLogout(HttpServletRequest request) {
    Long id = (Long) request.getAttribute("userId");
    this.jwtTokenService.changeTokenStatus(id, true);
    log.info("User id: " + id + " logged out");
    return ResponseEntity.ok("User with Id: " + id + " logged out");
  }

  private <T> ResponseEntity<HashMap<String, String>> getValidation(T request, Class<?>... marker){
    Set<ConstraintViolation<T>> violations = validator.validate(request, marker);

    //Validation results handling
    if (!violations.isEmpty()) {
      HashMap<String, String> errorResponse = new HashMap<>();
      for (ConstraintViolation<T> violation : violations) {
        errorResponse.put("field_validation_error", violation.getMessage());
      }
      return ResponseEntity.badRequest().body(errorResponse);
  } else return ResponseEntity.ok().body(new HashMap<>(){{put("field_validation", "Data is valid");}});
}}
