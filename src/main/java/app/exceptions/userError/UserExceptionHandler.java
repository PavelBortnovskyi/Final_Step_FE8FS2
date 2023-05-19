package app.exceptions.userError;

import app.exceptions.ErrorInfo;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestControllerAdvice
public class UserExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(UserNotFoundException.class)
  public ErrorInfo handleUserNotFoundException(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "User with id: " + ex.getMessage() + " not Found");
  }

  @ExceptionHandler(UserIncorrectIdException.class)
  public ErrorInfo handleIncorrectIdException(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "Incorrect user id: " + ex.getMessage());
  }

}
