package app.exceptions.authError;

import app.exceptions.BadRequestException;

public class EmailAlreadyRegisteredException extends BadRequestException {
  public EmailAlreadyRegisteredException(String message) {

    super("This email is already registered. Please choose another one." + message);
  }
}
