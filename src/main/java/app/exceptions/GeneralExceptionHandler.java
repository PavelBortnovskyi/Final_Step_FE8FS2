package app.exceptions;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Main exception handler
 */
@Log4j2
@RestControllerAdvice
@Order(Ordered.LOWEST_PRECEDENCE)
public class GeneralExceptionHandler extends ResponseEntityExceptionHandler {

  @Autowired
  private ObjectMapper objectMapper;

  @ExceptionHandler({EmailAlreadyRegisteredException.class})
  @ResponseBody
  public ErrorInfo handleSignUpException(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    log.error("Email already taken");
    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "This email is already registered. Please choose another one.");
  }

  @ExceptionHandler({UsernameIsTakenException.class})
  @ResponseBody
  public ErrorInfo handleSignUpException2(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    log.error("Username already taken");
    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "This username is already registered. Please choose another one.");
  }

  @ExceptionHandler({JwtAuthenticationException.class})
  @ResponseBody
  public ErrorInfo handleAuthException(JwtAuthenticationException ex, HttpServletRequest request, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    log.error("JWT token empty or invalid!");
    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "JWT token is empty or invalid. Please provide correct token and try again.");
  }

  @ExceptionHandler({AuthenticationException.class})
  @ResponseBody
  public ErrorInfo handleAuthException2(AuthenticationException ex, HttpServletRequest request, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    log.error("Wrong login or password!");
    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "Wrong login or password. Please try again.");
  }
}

