package app.exceptions;

import lombok.Getter;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.support.MethodArgumentNotValidException;
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

  // -------- SPRING ---------

  @ExceptionHandler({AuthenticationException.class})
  @ResponseBody
  public ErrorInfo handleAuthException2(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    log.error("Wrong login or password!");
    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), ex.getMessage());
  }

  @ExceptionHandler({MethodArgumentNotValidException.class})
  @ResponseBody
  public ErrorInfo handleWebSocketException(MethodArgumentNotValidException ex, HttpServletRequest request, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    log.error("Wrong request dto. Field validation failed!");
    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "Wrong request dto. Field validation failed!: " + ex.getMessage());
  }

}

