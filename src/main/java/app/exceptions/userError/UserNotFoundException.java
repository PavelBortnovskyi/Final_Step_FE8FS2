package app.exceptions.userError;

public class UserNotFoundException extends UserBadRequest {
  public UserNotFoundException(Long id) {
    super("User not found id: " + id.toString());
  }
}
