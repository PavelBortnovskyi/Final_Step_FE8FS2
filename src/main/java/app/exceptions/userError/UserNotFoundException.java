package app.exceptions.userError;

import app.exceptions.httpError.BadRequestException;

public class UserNotFoundException extends BadRequestException {
  public UserNotFoundException(Long id) {
    super("User not found id: " + id.toString());
  }
}
