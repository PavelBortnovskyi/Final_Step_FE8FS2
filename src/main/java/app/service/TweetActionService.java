package app.service;

import app.enums.TweetActionType;
import app.exceptions.TweetAction.TweetActionNotFoundException;
import app.exceptions.tweetError.TweetPermissionException;
import app.model.Tweet;
import app.model.TweetAction;
import app.model.UserModel;
import app.repository.TweetActionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
@RequiredArgsConstructor
public class TweetActionService {

  private final TweetActionRepository tweetActionRepository;


  public TweetAction getTweetAction(UserModel user, Tweet tweet, TweetActionType actionType) {
    return tweetActionRepository.getByUserAndTweetAndActionType(user, tweet, actionType)
      .orElseThrow(() -> new TweetActionNotFoundException(actionType, tweet.getId()));
  }

//  public boolean isTweetActionPresent(UserModel user, Tweet tweet, TweetActionType actionType){
//    return tweetActionRepository.getByUserAndTweetAndActionType(user, tweet, actionType).isPresent();
//  }

  @Transactional
  public TweetAction createTweetAction(UserModel user, Tweet tweet, TweetActionType tweetActionType) {
    return tweetActionRepository.getByUserAndTweetAndActionType(user, tweet, tweetActionType)
      .orElseGet(() -> tweetActionRepository.save(new TweetAction(tweetActionType, user, tweet)));
  }

  @Transactional
  public TweetAction removeTweetAction(UserModel user, Tweet tweet, TweetActionType tweetActionType) {
    TweetAction tweetAction = getTweetAction(user, tweet, tweetActionType);
    if (!tweetAction.getUser().getId().equals(user.getId())) throw new TweetPermissionException(tweet.getId());
    tweetActionRepository.delete(tweetAction);
    return tweetAction;
  }

  public Integer getCountLikes(Tweet tweet) {
    return tweetActionRepository.countAByTweetAndActionType(tweet, TweetActionType.LIKE);
  }

  public Integer getCountBookmarks(Tweet tweet) {
    return tweetActionRepository.countAByTweetAndActionType(tweet, TweetActionType.BOOKMARK);
  }

//  public Integer getCountRetweets(Tweet tweet) {
//    return tweetActionRepository.countAByTweetAndActionType(tweet, TweetActionType.RETWEET);
//  }
}
