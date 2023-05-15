package app.exceptions;

public class TweetIsDeleteException extends AppError{
  public TweetIsDeleteException(String message) {
    super(message);
  }
}
