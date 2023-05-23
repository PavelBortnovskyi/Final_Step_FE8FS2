package app.exceptions.messageError;


import app.exceptions.httpError.BadRequestException;

public class MessageException extends BadRequestException {
  public MessageException(String message) {
    super(message);
  }
}
