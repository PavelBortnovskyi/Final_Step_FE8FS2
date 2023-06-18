package app.exceptions.TweetAction;

import app.enums.TweetActionType;
import app.exceptions.httpError.BadRequestException;

public class TweetActionNotFoundException extends BadRequestException {
  public TweetActionNotFoundException(TweetActionType actionType, Long tweetId) {

    super("TweetAction " + actionType + " is not found for tweet id: " + tweetId);
  }

}
