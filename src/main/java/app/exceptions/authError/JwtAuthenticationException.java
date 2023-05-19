package app.exceptions.authError;

public class JwtAuthenticationException extends AuthErrorException {
  public JwtAuthenticationException(String message) {
    super(message);
  }
}
