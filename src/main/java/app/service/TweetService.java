package app.service;

import app.dto.rq.TweetRequest;
import app.exceptions.tweetError.TweetIsNotFoundException;
import app.model.Tweet;
import app.model.UserModel;
import app.repository.TweetModelRepository;
import lombok.RequiredArgsConstructor;
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

  public void addLikeToTweet(Long userId, long tweetId) {
    Optional<Tweet> tweet = tweetModelRepository.findById(tweetId);
    if (tweet.isPresent()) {
      Tweet newTweet = tweet.get();
      newTweet.setCountLikes(newTweet.getCountLikes() + 1);
    }
  }

  public void deleteTweet(Long tweetId) {
    this.tweetModelRepository.deleteById(tweetId);
    new TweetIsNotFoundException(String.format("Tweet: %d, has been deleted", tweetId));
  }

  public Tweet createTweet(TweetRequest tweetRequest, HttpServletRequest request) {
    UserModel user = userModelService.getUser((Long) request.getAttribute("userId")).orElse(null);
    Tweet tweet = new Tweet();
    tweet.setBody(tweetRequest.getBody());
    tweet.setTweetType(tweetRequest.getTweetType());
    tweet.setCountLikes(0);
    tweet.setCountRetweets(0);
    tweet.setCountReply(0);
    tweet.setUser(user);
    Tweet savedTweet = tweetModelRepository.save(tweet);
    return savedTweet;
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

  public List<Tweet> allUserFollowingTweet(Long userId) {
    Optional<List<UserModel>> followingUsers = tweetModelRepository.userFollowings(userId);
    return followingUsers.stream()
      .flatMap(u -> tweetModelRepository.getAllByUser((UserModel) u).stream())
      .collect(Collectors.toList());
  }

  public List<Tweet> getUserTweets(Long userId) {
    Optional<List<UserModel>> followingUsers = tweetModelRepository.userFollowings(userId);
    return tweetModelRepository.getAllByUserId(userId).stream()
      .collect(Collectors.toList());
  }

}
