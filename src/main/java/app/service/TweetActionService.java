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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
@RequiredArgsConstructor
public class TweetActionService {

  private final TweetActionRepository tweetActionRepository;
  private final TweetService tweetService;
  private final UserService userService;

  public TweetAction getTweetAction(UserModel user, Tweet tweet, TweetActionType actionType) {
    return tweetActionRepository.getByUserAndTweetAndActionType(user, tweet, actionType)
      .orElseThrow(() -> new TweetActionNotFoundException(actionType, tweet.getId()));
  }


  @Transactional
  public TweetAction createTweetAction(Long userId, Long tweetId, TweetActionType tweetActionType) {
    return tweetActionRepository.getByUserAndTweetAndActionType(userService.getUser(userId), tweetService.getTweet(tweetId), tweetActionType)
      .orElseGet(() -> tweetActionRepository.save(new TweetAction(tweetActionType, userService.getUser(userId), tweetService.getTweet(tweetId))));
  }


  @Transactional
  public TweetAction removeTweetAction(Long userId, Long tweetId, TweetActionType tweetActionType) {
    TweetAction tweetAction = getTweetAction(userService.getUser(userId), tweetService.getTweet(tweetId), tweetActionType);
    if (!tweetAction.getUser().getId().equals(userId)) throw new TweetPermissionException(tweetId);
    tweetActionRepository.delete(tweetAction);
    return tweetAction;
  }

  public Integer getCountLikes(Tweet tweet) {
    return tweetActionRepository.countAByTweetAndActionType(tweet, TweetActionType.LIKE);
  }

  public Integer getCountBookmarks(Tweet tweet) {
    return tweetActionRepository.countAByTweetAndActionType(tweet, TweetActionType.BOOKMARK);
  }

  public Page<TweetAction> getActionsByUser(UserModel user, TweetActionType tweetActionType, Pageable pageable) {
    return tweetActionRepository.findAllByUserAndActionTypeOrderByCreatedAtDesc(user, tweetActionType, pageable);
  }

  public boolean isUserActionTweet(UserModel currUser, Tweet tweet, TweetActionType tweetActionType) {
    return tweetActionRepository.existsByUserAndTweetAndActionType(currUser, tweet, tweetActionType);
  }
}
