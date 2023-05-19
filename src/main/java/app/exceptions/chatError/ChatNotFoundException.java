package app.exceptions.chatError;


import app.exceptions.httpError.BadRequestException;

public class ChatNotFoundException extends BadRequestException {
  public ChatNotFoundException(String message) {
    super(message);
  }
}
