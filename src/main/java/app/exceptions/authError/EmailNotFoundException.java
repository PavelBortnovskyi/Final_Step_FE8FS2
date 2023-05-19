package app.exceptions.authError;

public class EmailNotFoundException extends AuthErrorException {
  public EmailNotFoundException(String message) {
    super(message);
  }
}
