package app.controller;

import app.dto.rq.UserModelRequest;
import app.enums.TokenType;
import app.exceptions.AuthErrorException;
import app.exceptions.EmailAlreadyRegisteredException;
import app.model.UserModel;
import app.security.JwtTokenService;
import app.service.UserModelService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

@Log4j2
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

  @Autowired
  private UserModelService userService;

  @Autowired
  private JwtTokenService jwtTokenService;

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
  public HashMap<String, String> handleLogin(Authentication auth) {
    if (auth == null) {
      log.info("Auth null");
      return new HashMap<>() {{
        put("ACCESS_TOKEN", "");
      }};
    }

    Object principal = auth.getPrincipal();

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
