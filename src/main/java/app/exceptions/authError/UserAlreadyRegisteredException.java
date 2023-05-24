package app.exceptions.authError;

import app.exceptions.httpError.BadRequestException;


public class UserAlreadyRegisteredException extends BadRequestException {
  public UserAlreadyRegisteredException(String message) {

    super("User with " + message + " already registered.");
  }
}
