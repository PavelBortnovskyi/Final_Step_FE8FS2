package app.controller;

import app.exceptions.AuthErrorException;
import app.model.UserModel;
import app.service.GeneralService;
import app.service.UserModelService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Log4j2
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

  @Autowired
  private GeneralService<UserModel> userService;

  @PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
  public @ResponseBody User getAuthUser() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth == null) {
      log.info("Auth null");
      return null;
    }
    Object principal = auth.getPrincipal();
    Optional<User> currentUser = (principal instanceof User) ? Optional.of((User) principal) : Optional.empty();
    return currentUser.orElseThrow(() -> new AuthErrorException("Something went wrong during authentication"));
  }
}
