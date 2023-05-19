package app.exceptions.userError;

import app.exceptions.BadRequestException;

public class NotFoundExceptionException extends BadRequestException {
  public NotFoundExceptionException(Long id) {
    super("User not found id: " + id.toString());
  }
}
