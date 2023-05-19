package app.controller;

import app.dto.rq.UserModelRequest;
import app.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

  private final AuthService authService;

  @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HashMap<String, String>> handleLogin(@RequestBody UserModelRequest loginDTO) {
    return this.authService.makeLogin(loginDTO);
  }

  @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HashMap<String, String>> handleRegistration(@RequestBody UserModelRequest signUpDTO) {
    return this.authService.makeSighUp(signUpDTO);
  }

  @GetMapping(path = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> handleLogout(HttpServletRequest request) {
    return ResponseEntity.ok(this.authService.makeLogOut((Long) request.getAttribute("userId")));
  }
}
