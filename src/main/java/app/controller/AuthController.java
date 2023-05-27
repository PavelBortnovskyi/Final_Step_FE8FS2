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

@CrossOrigin
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

  @Validated({Marker.PasswordUpdate.class})
  @PostMapping(path = "/password/update", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HashMap<String, String>> handlePasswordUpdate(@RequestBody @JsonView({Marker.PasswordUpdate.class})
                                                                      @Valid UserModelRequest passUpDto) {
    return this.authService.makePasswordUpdate(passUpDto);
  }

  /**
   * This endpoint waiting for DTO with user email to send letter with link includes password reset token
   */
  //TODO: get from frontend url to specify link in letter
  @Validated({Marker.PasswordReset.class})
  @PostMapping(path = "/password/reset", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> handleGetPasswordResetToken(@RequestBody @JsonView({Marker.PasswordReset.class})
                                                            @Valid UserModelRequest passResetDto) {
    return this.authService.getPasswordResetToken(passResetDto);
  }

  /**
   * This endpoint waiting for DTO with password reset token and new password to replace
   */
  @Validated({Marker.PasswordUpdateAfterReset.class})
  @PostMapping(path = "/password/reset/apply", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HashMap<String, String>> handleGetPasswordChange(@RequestBody @JsonView({Marker.PasswordUpdateAfterReset.class})
                                                                         @Valid UserModelRequest passResetDto, HttpServletRequest request) {
    return this.authService.makePasswordReset(passResetDto, request);
  }
}
