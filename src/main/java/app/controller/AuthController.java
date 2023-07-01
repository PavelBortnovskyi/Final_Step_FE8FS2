package app.controller;

import app.annotations.Marker;
import app.dto.rq.UserRequestDTO;
import app.facade.AuthFacade;
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

@CrossOrigin(originPatterns = {"http://localhost:3000", "https://final-step-fe-8-fs-2.vercel.app"})
@Log4j2
@RestController
@RequestMapping("/api/v1/auth")
@Validated
@RequiredArgsConstructor
public class AuthController {

  private final AuthFacade authFacade;

  /**
   * This endpoint waiting for valid loginDTO to check credentials and return new token pair(Access and Refresh)
   */
  @Validated({Marker.Existed.class})
  @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HashMap<String, String>> handleLogin(@RequestBody @JsonView(Marker.Existed.class) @Valid UserRequestDTO loginDTO) {
    return this.authFacade.makeLogin(loginDTO);
  }

  /**
   * This endpoint waiting for valid sighUpDTO to register new account and return new token pair(Access and Refresh)
   */
  @Validated({Marker.New.class})
  @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HashMap<String, String>> handleRegistration(@RequestBody @JsonView(Marker.New.class) @Valid UserRequestDTO signUpDTO) {
    return this.authFacade.makeSighUp(signUpDTO);
  }

  /**
   * This endpoint waiting for valid token in request to perform refresh token invalidation
   */
  @GetMapping(path = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> handleLogout(HttpServletRequest request) {
    return ResponseEntity.ok(this.authFacade.makeLogOut((Long) request.getAttribute("userId")));
  }

  /**
   * This endpoint waiting DTO with old and new password to check email - password combination for password update
   */
  @Validated({Marker.PasswordUpdate.class})
  @PostMapping(path = "/password/update", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HashMap<String, String>> handlePasswordUpdate(@RequestBody @JsonView({Marker.PasswordUpdate.class})
                                                                      @Valid UserRequestDTO passUpDto) {
    return this.authFacade.makePasswordUpdate(passUpDto);
  }

  /**
   * This endpoint waiting for DTO with user email to send letter with link includes password reset token
   */
  //TODO: get from frontend url to specify link in letter
  @Validated({Marker.PasswordReset.class})
  @PostMapping(path = "/password/reset", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> handleGetPasswordResetToken(@RequestBody @JsonView({Marker.PasswordReset.class})
                                                            @Valid UserRequestDTO passResetDto) {
    return this.authFacade.sendPasswordResetTokenToEmail(passResetDto);
  }

  /**
   * This endpoint waiting for DTO with password reset token and new password to replace
   */
  @Validated({Marker.PasswordUpdateAfterReset.class})
  @PostMapping(path = "/password/reset/apply", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HashMap<String, String>> handleGetPasswordChange(@RequestBody @JsonView({Marker.PasswordUpdateAfterReset.class})
                                                                         @Valid UserRequestDTO passResetDto, HttpServletRequest request) {
    return this.authFacade.makePasswordReset(passResetDto, request);
  }

  @GetMapping(path = "/refresh", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HashMap<String, String>> handleRefresh(HttpServletRequest request) {
    return this.authFacade.makeRefresh(request);
  }

  @GetMapping("/oauth/error")
  public String error(HttpServletRequest request) {
    String message = (String) request.getSession().getAttribute("error.message");
    request.getSession().removeAttribute("error.message");
    return message;
  }
}
