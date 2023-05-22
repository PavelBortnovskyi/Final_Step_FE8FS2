package app.exceptions.messageError;


import app.exceptions.httpError.BadRequestException;

public class MessageNotFoundException extends BadRequestException {
  public MessageNotFoundException(String message) {
    super(message);
  }
}
