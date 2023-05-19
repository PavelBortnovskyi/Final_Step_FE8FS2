package app.exceptions.userError;

public class UserIncorrectIdException extends UserBadRequest {
  public UserIncorrectIdException(Long id) {
    super("Incorrect user id: " + id.toString());
  }
}
