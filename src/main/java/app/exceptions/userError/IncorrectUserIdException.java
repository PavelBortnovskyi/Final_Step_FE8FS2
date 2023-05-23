package app.exceptions.userError;

import app.exceptions.httpError.BadRequestException;

public class IncorrectUserIdException extends BadRequestException {
  public IncorrectUserIdException(Long id) {
    super("Incorrect user id: " + id.toString());
  }
}
