package app.controller;

import app.dto.rq.UserModelRequest;
import app.security.JwtUserDetails;
import app.service.JwtTokenService;
import app.service.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {

  private final UserModelService userService;

  private final PasswordEncoder encoder;

  private final JwtTokenService jwtTokenService;

  private final AuthenticationManager authenticationManager;

  @PostMapping(value = "/id", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> extractId(@RequestBody UserModelRequest loginRequest) {
    Authentication authentication = authenticationManager
      .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    JwtUserDetails jwt = (JwtUserDetails) authentication.getDetails();

    return ResponseEntity.ok(jwt.getId().toString());
  }
}
