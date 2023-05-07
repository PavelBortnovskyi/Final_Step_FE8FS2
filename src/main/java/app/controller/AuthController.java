package app.controller;

import app.exceptions.AuthErrorException;
import app.service.UserModelService;
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

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

  @PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
  public @ResponseBody User getAuthUser() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth == null) {
      return null;
    }
    Object principal = auth.getPrincipal();
    Optional<User> currentUser = (principal instanceof User) ? Optional.of((User) principal) : Optional.empty();
    return currentUser.orElseThrow(() -> new AuthErrorException("Something went wrong during authentication"));
  }
}
