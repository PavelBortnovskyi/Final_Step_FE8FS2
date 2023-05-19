package app.exceptions.userError;

import app.exceptions.BadRequestException;

public class IncorrectIdExceptionException extends BadRequestException {
  public IncorrectIdExceptionException(Long id) {
    super("Incorrect user id: " + id.toString());
  }
}
