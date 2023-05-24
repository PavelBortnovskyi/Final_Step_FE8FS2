package app.service;

import app.dto.rq.TweetRequest;
import app.dto.rs.TweetResponse;
import app.enums.TweetType;
import app.model.Tweet;
import app.model.UserModel;
import app.repository.TweetModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TweetService extends GeneralService<Tweet> {
  private final TweetModelRepository tweetModelRepository;
  private final UserModelService userModelService;
  private final TweetActionService tweetActionService;

  public Optional<Tweet> getTweet(Long id) {
    Optional<Tweet> tweet = findById(id);
    return tweet;
  }

  public void deleteTweet(Long tweetId) {
    this.tweetModelRepository.deleteById(tweetId);
  }

  public TweetResponse create(TweetRequest tweetRequest, HttpServletRequest request, TweetType tweetType) {
    UserModel user = userModelService.getUser((Long) request.getAttribute("userId")).orElse(null);
    Tweet tweet = new Tweet();
    tweet.setBody(tweetRequest.getBody());
    tweet.setTweetType(tweetType);

    tweet.setUser(user);
    Tweet savedTweet = tweetModelRepository.save(tweet);
    TweetResponse tweetResponse = new TweetResponse();
    tweetResponse.setTweetId(savedTweet.getId());
    tweetResponse.setBody(savedTweet.getBody());
    tweetResponse.setTweetType(savedTweet.getTweetType());
    tweetResponse.setUserAvatarImage(savedTweet.getUser().getAvatarImgUrl());
    tweetResponse.setUserTag(savedTweet.getUser().getUserTag());
    tweetResponse.setParentTweetId(savedTweet.getParentTweetId().getId() != 0 ? savedTweet.getParentTweetId().getId() : null);
    tweetResponse.setCountLikes(tweetActionService.getCountLikes(savedTweet.getId()));
    tweetResponse.setCountRetweets(tweetActionService.getCountRetweet(savedTweet.getId()));
    tweetResponse.setCountReply(tweetActionService.getCountBookmarks(savedTweet.getId()));


    return tweetResponse;
  }

  public TweetResponse createTweet(TweetRequest tweetRequest, HttpServletRequest request) {
    tweetActionService.addRetweet(tweetRequest.getParentTweetId(), request);
    return create(tweetRequest, request, TweetType.TWEET);
  }

  public TweetResponse createRetweet(TweetRequest tweetRequest, HttpServletRequest request) {
    return create(tweetRequest, request, TweetType.QUOTE_TWEET);
  }

  public TweetResponse createReply(TweetRequest tweetRequest, HttpServletRequest request) {
    return create(tweetRequest, request, TweetType.REPLY);
  }

  public Optional<Tweet> updateTweet(Long tweetId, TweetRequest tweetRequest) {
    Optional<Tweet> tweet = tweetModelRepository.findById(tweetId);
    if (tweet.isPresent()) {
      Tweet tweetToUpdate = tweet.get();
      tweetToUpdate.setBody(tweetRequest.getBody());
      tweetModelRepository.save(tweetToUpdate);
    }
    return tweet;
  }

  public ResponseEntity<List<Tweet>> allUserFollowingTweet(HttpServletRequest request, Integer pageNumber) {
    List<Long> userIds = userModelService.getUser((Long) request.getAttribute("userId")).orElse(null)
      .getFollowings().stream().map(u -> u.getId()).toList();
    return ResponseEntity.ok(tweetModelRepository.findTweetsByUserIdsSortedByDate(userIds,
      Pageable.ofSize(10).withPage(pageNumber)).toList());
  }

  public ResponseEntity<List<Tweet>> getUserTweets(Long userId) {
    return ResponseEntity.ok(tweetModelRepository.getUserTweets(userId));
  }

}
