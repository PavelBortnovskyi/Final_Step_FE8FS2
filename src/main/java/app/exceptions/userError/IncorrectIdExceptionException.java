package app.exceptions.userError;

import app.exceptions.httpError.BadRequestException;

public class IncorrectIdExceptionException extends BadRequestException {
  public IncorrectIdExceptionException(Long id) {
    super("Incorrect user id: " + id.toString());
  }
}
