package app.exceptions;

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

  @ExceptionHandler(UnAuthorizedException.class)
  public ErrorInfo handleLoginException2(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), ex.getMessage());
  }

  @ExceptionHandler(BadRequestException.class)
  public ErrorInfo handleUserNotFoundException(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), ex.getMessage());
  }

  public record ErrorInfo(String url, String info) {
  }

}

