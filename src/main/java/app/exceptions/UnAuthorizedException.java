package app.exceptions;

public class UnAuthorizedException extends AppError {
  public UnAuthorizedException(String msg) {
    super("UNAUTHORIZED. " + msg);
  }
}
