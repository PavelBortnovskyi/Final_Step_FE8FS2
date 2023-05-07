package app.controller;

import app.exceptions.AuthErrorException;
import app.model.UserModel;
import app.service.UserModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/create")
public class TestController {

  @Autowired
  private UserModelService userService;

  @Autowired
  private PasswordEncoder encoder;

 @GetMapping
  public void createSample(){
    UserModel sample = new UserModel("Homer", "DUFF", encoder.encode("111"), "111@gmail.com");
    sample.setRefreshToken("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJEVUZGIiwiZW1haWwiOiIxMTFAZ21haWwuY29tIiwiaWF0IjoxNjgzNDcwNTg4LCJleHAiOjE2ODM0Nzc3ODh9.eNpnB6TLFcQmaEr9JGrE-7kyvsXh0Ad__s4BX5J5nyrVrYLueeDz9a7nUxAsJO-jInOoUvvsX5uHIHf2B-tZ6Q");
    this.userService.save(sample);
  }
}
