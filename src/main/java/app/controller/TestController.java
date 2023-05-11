package app.controller;

import app.enums.TokenType;
import app.model.UserModel;
import app.service.JwtTokenService;
import app.service.UserModelService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/create")
public class TestController {

  @Autowired
  private UserModelService userService;

  @Autowired
  private PasswordEncoder encoder;

  @Autowired
  private JwtTokenService jwtTokenService;

 @GetMapping
  public void createSample(){
    UserModel sample = new UserModel();
    sample.setEmail("111@gmail.com");
    sample.setFullName("Homer");
    sample.setUserTag("DUFF");
    sample.setPassword(encoder.encode("111"));
    String refreshToken = this.jwtTokenService.createToken(1L, TokenType.REFRESH);
    String accessToken = this.jwtTokenService.createToken(1L, TokenType.ACCESS, "DUFF", "111@gmail.com");
    log.info("REFRESH:" + refreshToken);
    log.info("ACCESS:" + accessToken);
    sample.setRefreshToken(refreshToken);
    this.userService.save(sample);
  }
}
