package app.exceptions;

public class BadRequestException extends AppError {
  public BadRequestException(String msg) {
    super("BAD REQUEST. " + msg);
  }
}
