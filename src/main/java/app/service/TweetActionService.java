package app.service;

import app.enums.TweetActionType;
import app.model.Tweet;
import app.repository.TweetActionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class TweetActionService {

  private final TweetActionRepository tweetActionRepository;

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
