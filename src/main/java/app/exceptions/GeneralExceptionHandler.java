package app.exceptions;

import lombok.Getter;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Main exception handler
 */
@RestControllerAdvice
public class GeneralExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler({EmailAlreadyRegisteredException.class})
  public ErrorInfo handleSignUpException(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "This email is already registered. Please choose another one.");
  }

  @ExceptionHandler({UsernameIsTakenException.class})
  public ErrorInfo handleSignUpException2(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "This username is already registered. Please choose another one.");
  }

  @ExceptionHandler({WrongPasswordException.class})
  public ErrorInfo handleLoginException(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "Password is wrong!");
  }

  @ExceptionHandler({JwtAuthenticationException.class})
  public ErrorInfo handleLoginException2(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), ex.getMessage());
  }

  @Getter
  public class ErrorInfo {
    private final String url;
    private final String info;

    ErrorInfo(String url, String info) {
      this.url = url;
      this.info = info;
    }
  }
}

