package app.exceptions.authError;

import app.exceptions.httpError.BadRequestException;


public class EmailAlreadyRegisteredException extends BadRequestException {
  public EmailAlreadyRegisteredException(String message) {

    super("User with " + message + " already registered.");
  }
}
