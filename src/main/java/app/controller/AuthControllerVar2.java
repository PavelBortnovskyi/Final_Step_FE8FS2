package app.controller;

import app.annotations.Details;
import app.dto.rs.UserModelResponse;
import app.enums.TokenType;
import app.exceptions.AuthErrorException;
import app.model.UserModel;
import app.security.JwtTokenService;
import app.service.UserModelService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Log4j2
@RestController
@RequestMapping("/api/v1/auth")
public class AuthControllerVar2 {

  @Autowired
  private UserModelService userService;

  @Autowired
  private JwtTokenService jwtTokenService;

  @JsonView({Details.class})
  @PostMapping(path = "/login2", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> getAuthUser(Authentication auth) {
    if (auth == null) {
      log.info("Auth null");
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
    }

    Object principal = auth.getPrincipal();

    Optional<User> maybeAuthUser = (principal instanceof User) ? Optional.of((User) principal) : Optional.empty();
    User authUser = maybeAuthUser.orElseThrow(() -> new AuthErrorException("Something went wrong during authentication"));

    Optional<UserModel> maybeCurrentUser = this.userService.getUserByEmail(authUser.getUsername());
    UserModel currentUser = maybeCurrentUser.orElseThrow(() -> new AuthErrorException("Authenticated user not found in DB!"));

    String accessToken = this.jwtTokenService.createToken(currentUser.getId(), TokenType.ACCESS, currentUser.getUserTag(), currentUser.getEmail());
    String refreshToken = this.jwtTokenService.createToken(currentUser.getId(), TokenType.REFRESH);

    currentUser.setRefreshToken(refreshToken);
    this.userService.save(currentUser);

    UserModelResponse response = new UserModelResponse();
    response.setAccessToken(accessToken);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
}
