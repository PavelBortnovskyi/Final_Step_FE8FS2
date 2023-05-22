package app.controller;

import app.annotations.Marker;
import app.dto.rq.UserModelRequest;
import app.service.AuthService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
@Validated
public class AuthController {

  private final AuthService authService;

  @Validated({Marker.Existed.class})
  @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HashMap<String, String>> handleLogin(@RequestBody @JsonView(Marker.Existed.class) @Valid UserModelRequest loginDTO) {
    return this.authService.makeLogin(loginDTO);
  }

  @Validated({Marker.New.class})
  @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HashMap<String, String>> handleRegistration(@RequestBody @JsonView(Marker.New.class) @Valid UserModelRequest signUpDTO) {
    return this.authService.makeSighUp(signUpDTO);
  }

  @GetMapping(path = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> handleLogout(HttpServletRequest request) {
    return ResponseEntity.ok(this.authService.makeLogOut((Long) request.getAttribute("userId")));
  }
}
