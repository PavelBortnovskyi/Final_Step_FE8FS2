package app.exceptions.authError;

import app.exceptions.BadRequestException;
import lombok.extern.log4j.Log4j2;


public class EmailAlreadyRegisteredException extends BadRequestException {
  public EmailAlreadyRegisteredException(String message) {

    super("This email is already registered. Please choose another one." + message);
  }
}
