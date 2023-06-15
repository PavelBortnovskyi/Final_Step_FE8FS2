package app.service;

import app.enums.TweetActionType;
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

  @Transactional
  public TweetAction actionTweet(UserModel user, Tweet tweet, TweetActionType tweetActionType){
    return tweetActionRepository.save(new TweetAction(tweetActionType, user, tweet));
  }

  public Integer getCountLikes(Tweet tweet) {
    return tweetActionRepository.countAByTweetAndActionType(tweet, TweetActionType.LIKE);
  }

  public Integer getCountBookmarks(Tweet tweet) {
    return tweetActionRepository.countAByTweetAndActionType(tweet, TweetActionType.BOOKMARK);
  }

  public Integer getCountRetweets(Tweet tweet) {
    return tweetActionRepository.countAByTweetAndActionType(tweet, TweetActionType.RETWEET);
  }
}
