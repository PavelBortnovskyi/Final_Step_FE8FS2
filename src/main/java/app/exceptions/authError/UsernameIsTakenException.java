package app.exceptions.authError;

public class UsernameIsTakenException extends AuthErrorException {
  public UsernameIsTakenException(String message) {
    super(message);
  }
}
