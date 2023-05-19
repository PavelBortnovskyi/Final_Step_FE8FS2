package app.exceptions.userError;

import app.exceptions.AppError;

public class UserIncorrectIdException extends AppError {
  public UserIncorrectIdException(Long id) {
    super(id.toString());
  }
}
