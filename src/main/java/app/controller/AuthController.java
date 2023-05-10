package app.controller;

import app.annotations.Existed;
import app.dto.rq.UserModelRequest;
import app.enums.TokenType;
import app.exceptions.AuthErrorException;
import app.exceptions.EmailAlreadyRegisteredException;
import app.model.UserModel;
import app.service.JwtTokenService;
import app.service.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Optional;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

  private final UserModelService userService;

  private final JwtTokenService jwtTokenService;

  private final ModelMapper modelMapper;

  private final PasswordEncoder passwordEncoder;

  private final AuthenticationManager authenticationManager;

  @PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
  public HashMap<String, String> handleLogin(@RequestBody UserModelRequest loginRequest) {

    Authentication authentication = authenticationManager
      .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    Object principal = authentication.getPrincipal();

    Optional<User> maybeAuthUser = (principal instanceof User) ? Optional.of((User) principal) : Optional.empty();
    User authUser = maybeAuthUser.orElseThrow(() -> new AuthErrorException("Something went wrong during authentication"));

    //User extraction from DB by security credentials from Authenticated User (email aka username)
    Optional<UserModel> maybeCurrentUser = this.userService.getUserByEmail(authUser.getUsername());
    UserModel currentUser = maybeCurrentUser.orElseThrow(() -> new AuthErrorException("Authenticated user not found in DB! MAGIC!"));

    //Token creation
    String accessToken = this.jwtTokenService.createToken(currentUser.getId(), TokenType.ACCESS, currentUser.getUserTag(), currentUser.getEmail());
    String refreshToken = this.jwtTokenService.createToken(currentUser.getId(), TokenType.REFRESH);

    //Update refresh token for current user
    this.userService.updateRefreshToken(currentUser, refreshToken);

    return new HashMap<>() {{
      put("ACCESS_TOKEN", accessToken);
      put("REFRESH_TOKEN", refreshToken);
    }};
  }

  @PostMapping(path = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
  public HashMap<String, String> handleRegistration(@RequestBody UserModelRequest signUpDTO) {
    //Email duplicate checking
    if (this.userService.checkEmail(signUpDTO.getEmail()))
      throw new EmailAlreadyRegisteredException("Email: " + signUpDTO.getEmail() + " already taken!");

    //Mapping signUpDTO -> UserModel
    UserModel freshUser = new UserModel();
    signUpDTO.setPassword(this.passwordEncoder.encode(signUpDTO.getPassword()));
    modelMapper.map(signUpDTO, freshUser);
    //Saving new User to DB and getting user_id to freshUser
    freshUser = this.userService.save(freshUser);

    //Token creation using user_id
    String accessToken = this.jwtTokenService.createToken(freshUser.getId(), TokenType.ACCESS, freshUser.getUserTag(), freshUser.getEmail());
    String refreshToken = this.jwtTokenService.createToken(freshUser.getId(), TokenType.REFRESH);

    //New user saving to DB with refresh token
    freshUser.setRefreshToken(refreshToken);
   this.userService.save(freshUser);

    return new HashMap<>() {{
      put("ACCESS_TOKEN", accessToken);
      put("REFRESH_TOKEN", refreshToken);
    }};
  }
}
