package app.exceptions.tweetError;

import app.exceptions.httpError.BadRequestException;

public class TweetIsNotFoundException extends BadRequestException {
  public TweetIsNotFoundException(Long message) {

    super("Tweet is not found id: " + message);
  }

}
