package app.controller;

import app.enums.TokenType;
import app.exceptions.AuthErrorException;
import app.model.UserModel;
import app.security.JwtTokenService;
import app.service.UserModelService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

  @PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
  public HashMap<String, String> getAuthUser(Authentication auth) {
    if (auth == null) {
      log.info("Auth null");
      return new HashMap<>(){{put("ACCESS_TOKEN", "");}};
    }

    Object principal = auth.getPrincipal();

    Optional<User> maybeAuthUser = (principal instanceof User) ? Optional.of((User) principal) : Optional.empty();
    User authUser = maybeAuthUser.orElseThrow(() -> new AuthErrorException("Something went wrong during authentication", HttpStatus.UNAUTHORIZED));

    //User extraction from DB by security credentials from Authenticated User (email aka username)
    Optional<UserModel> maybeCurrentUser = this.userService.getUserByEmail(authUser.getUsername());
    UserModel currentUser = maybeCurrentUser.orElseThrow(() -> new AuthErrorException("Authenticated user not found in DB! MAGIC!", HttpStatus.INTERNAL_SERVER_ERROR));

    //Token creation
    String accessToken = this.jwtTokenService.createToken(currentUser.getId(), TokenType.ACCESS, currentUser.getUserTag(), currentUser.getEmail());
    String refreshToken = this.jwtTokenService.createToken(currentUser.getId(), TokenType.REFRESH);

    //Update refresh token for current user
    this.userService.updateRefreshToken(currentUser, refreshToken);

    return new HashMap<>(){{put("ACCESS_TOKEN", accessToken);put("REFRESH_TOKEN", refreshToken);}};
  }
}
