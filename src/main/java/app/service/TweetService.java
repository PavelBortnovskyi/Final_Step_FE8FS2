package app.service;

import app.dto.rq.TweetRequest;
import app.dto.rs.TweetResponse;
import app.enums.TweetType;
import app.exceptions.tweetError.TweetIsNotFoundException;
import app.facade.TweetFacade;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TweetService extends GeneralService<Tweet> {
  private final TweetModelRepository tweetModelRepository;
  private final UserModelService userModelService;

  public Optional<Tweet> getTweet(Long id){
    Optional<Tweet> tweet = findById(id);
    return tweet;
  }

  public void addLikeToTweet(Long userId, long tweetId) {
    Optional<Tweet> tweet = tweetModelRepository.findById(tweetId);
    if (tweet.isPresent()) {
      Tweet newTweet = tweet.get();
      //newTweet.setCountLikes(newTweet.getCountLikes() + 1);
    }
  }

  public void deleteTweet(Long tweetId) {
    this.tweetModelRepository.deleteById(tweetId);
    new TweetIsNotFoundException(String.format("Tweet: %d, has been deleted", tweetId));
  }


  public TweetResponse createTweet(TweetRequest tweetRequest, HttpServletRequest request) {
    UserModel user = userModelService.getUser((Long) request.getAttribute("userId")).orElse(null);
    Tweet tweet = new Tweet();
    tweet.setBody(tweetRequest.getBody());
    tweet.setTweetType(TweetType.TWEET);

    tweet.setUser(user);
    Tweet savedTweet = tweetModelRepository.save(tweet);
    TweetResponse tweetResponse = new TweetResponse();
    tweetResponse.setTweetId(savedTweet.getId());
    tweetResponse.setBody(savedTweet.getBody());
    tweetResponse.setTweetType(savedTweet.getTweetType());
    tweetResponse.setUserAvatarImage(savedTweet.getUser().getAvatarImgUrl());
    tweetResponse.setUserTag(savedTweet.getUser().getUserTag());


    return tweetResponse;
  }

  public Optional<Tweet> update(Tweet tweetRequest) {
    Optional<Tweet> tweet = tweetModelRepository.findById(tweetRequest.getId());
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

  public Optional<Tweet> updateTweet(Long id, TweetRequest tweetRequest) {
    Optional<Tweet> tweet = findById(id);
    return tweet;
  }

}
