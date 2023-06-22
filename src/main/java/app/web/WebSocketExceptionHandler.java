package app.web;

import app.exceptions.SocketErrorInfo;
import app.exceptions.authError.JwtAuthenticationException;
import app.exceptions.httpError.BadRequestException;
import app.exceptions.validation.Violation;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.validation.ConstraintViolationException;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


/**
 * Main exception handler for web-sockets
 */
@Log4j2
@ControllerAdvice
@RequiredArgsConstructor
public class WebSocketExceptionHandler {
  private final ObjectMapper objectMapper;

  @ExceptionHandler(BadRequestException.class)
  public void handleException(Exception ex, WebSocketSession session){
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

  @ExceptionHandler({AuthenticationException.class, JwtAuthenticationException.class})
  public void handleAuthException(RuntimeException ex, WebSocketSession session) throws IOException {
    this.sendErrorInfo(session, "401", ex.getMessage());
  }

  private void sendErrorInfo(WebSocketSession session, String code, String message) {
    try {
      String errorInfoJson = objectMapper.writeValueAsString(new SocketErrorInfo(code, message));
      session.sendMessage(new TextMessage(errorInfoJson));
    } catch (IOException e) {log.info("Websocket IOExcepion " + e.getMessage());};
  }
}
