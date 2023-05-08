package app.exceptions;

public class JwtAuthenticationException extends AuthErrorException {
  public JwtAuthenticationException(String message) {
    super(message);
  }
}
