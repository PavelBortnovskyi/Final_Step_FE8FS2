package app.exceptions.userError;

import app.exceptions.AppError;

public class UserBadRequest extends AppError {
  public UserBadRequest(String msg) {
    super("BAD REQUEST. " + msg);
  }
}
