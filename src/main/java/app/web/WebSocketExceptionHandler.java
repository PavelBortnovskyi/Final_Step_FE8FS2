package app.web;

import app.exceptions.ErrorInfo;
import app.exceptions.SocketErrorInfo;
import app.exceptions.httpError.BadRequestException;
import app.exceptions.validation.ValidationErrorResponse;
import app.exceptions.validation.Violation;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolationException;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


/**
 * Main exception handler for web-sockets
 */
@Log4j2
@ControllerAdvice
public class WebSocketExceptionHandler {

  @Autowired
  private ObjectMapper objectMapper;

  @ExceptionHandler(BadRequestException.class)
  public void handleException(Exception ex, WebSocketSession session) throws IOException {
    log.info(ex.getMessage());
    this.sendErrorInfo(session, "400", ex.getMessage());
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public void onConstraintValidationException(ConstraintViolationException e) throws JsonProcessingException {
    final List<Violation> violations = e.getConstraintViolations().stream()
      .map(
        violation -> new Violation(
          violation.getPropertyPath().toString(),
          violation.getMessage()
        )
      )
      .collect(Collectors.toList());
    objectMapper.writeValueAsString(violations);
  }

  @ExceptionHandler({AuthenticationException.class})
  public void handleAuthException(RuntimeException ex, WebSocketSession session) throws IOException {
    this.sendErrorInfo(session, "401", ex.getMessage());
  }

  private void sendErrorInfo(WebSocketSession session, String code, String message) throws IOException {
    String errorInfoJson = objectMapper.writeValueAsString(new SocketErrorInfo(code, message));
    session.sendMessage(new TextMessage(errorInfoJson));
  }
}
