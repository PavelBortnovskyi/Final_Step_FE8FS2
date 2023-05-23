package app.exceptions;

import app.exceptions.httpError.BadRequestException;
import app.exceptions.httpError.UnAuthorizedException;
import app.exceptions.validation.ValidationErrorResponse;
import app.exceptions.validation.Violation;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.support.MethodArgumentNotValidException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Main exception handler
 */
@Log4j2
@RestControllerAdvice
@Order(Ordered.LOWEST_PRECEDENCE)
public class GeneralExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(UnAuthorizedException.class)
  public ErrorInfo handleLoginException(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
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
  public ErrorInfo handleAuthException(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    log.error("Wrong login or password!");
    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), ex.getMessage());
  }

//  @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
//  @ResponseBody
//  public ErrorInfo handleValidation(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
//    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//    log.error("Wrong request dto. Field validation failed!");
//    return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "Wrong request dto. Field validation failed!: " + ex.getMessage());
//  }

  @ResponseBody
  @ExceptionHandler(ConstraintViolationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ValidationErrorResponse onConstraintValidationException(
      ConstraintViolationException e
  ) {
    final List<Violation> violations = e.getConstraintViolations().stream()
        .map(
            violation -> new Violation(
                violation.getPropertyPath().toString(),
                violation.getMessage()
            )
        )
        .collect(Collectors.toList());
    return new ValidationErrorResponse(violations);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ResponseBody
  public ValidationErrorResponse onMethodArgumentNotValidException(
      MethodArgumentNotValidException e
  ) {
    final List<Violation> violations = e.getBindingResult().getFieldErrors().stream()
        .map(error -> new Violation(error.getField(), error.getDefaultMessage()))
        .collect(Collectors.toList());
    return new ValidationErrorResponse(violations);
  }
}

