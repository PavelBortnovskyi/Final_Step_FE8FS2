package app.exceptions.tweetError;

import app.exceptions.httpError.BadRequestException;

public class TweetDeleteError extends BadRequestException {
  public TweetDeleteError(Long tweetId) {

    super("You do not have permission to delete a tweet id: " + tweetId);
  }

}
