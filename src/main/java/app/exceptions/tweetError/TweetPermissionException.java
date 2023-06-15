package app.exceptions.tweetError;

import app.exceptions.httpError.BadRequestException;

public class TweetPermissionError extends BadRequestException {
  public TweetPermissionError(Long tweetId) {

    super("You do not have permission to this action with tweet id: " + tweetId);
  }

}
