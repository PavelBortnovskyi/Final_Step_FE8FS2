package app.exceptions;


import org.springframework.http.HttpStatus;


public class JwtAuthenticationException extends AuthErrorException{
  public JwtAuthenticationException (String message, HttpStatus unauthorized) {
    super(message);
  }
}
