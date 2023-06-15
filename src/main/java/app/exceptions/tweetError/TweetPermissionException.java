package app.exceptions.tweetError;

import app.exceptions.httpError.BadRequestException;

public class TweetPermissionException extends BadRequestException {
  public TweetPermissionException(Long tweetId) {

    super("You do not have permission to this action with tweet id: " + tweetId);
  }

}
