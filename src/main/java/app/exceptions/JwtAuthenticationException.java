package app.exceptions;


import lombok.Data;
import org.springframework.http.HttpStatus;


public class JwtAuthenticationException extends AuthErrorException {
  public JwtAuthenticationException(String message, HttpStatus status) {
    super(message, status);
  }
}
