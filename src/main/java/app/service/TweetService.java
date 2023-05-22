package app.service;

import app.dto.rq.TweetRequest;
import app.dto.rs.TweetResponse;
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

  public Optional<Tweet> getTweet(Long id){
    Optional<Tweet> tweet = findById(id);
    return tweet;
  }

  public void addLikeToTweet(Long userId, long tweetId){
    Optional<Tweet> tweet = tweetModelRepository.findById(tweetId);
    if (tweet.isPresent()) {
      Tweet newTweet = tweet.get();
      newTweet.setCountLikes(newTweet.getCountLikes() + 1);
    }
  }
  public void deleteTweet(String tweetId, HttpServletRequest request) {
    Optional<Tweet> tweet = tweetModelRepository.findById(Long.valueOf(tweetId));
    if (tweet.isPresent() && tweet.get().getUser().getId().equals(request.getAttribute("userId"))) {
      tweetModelRepository.deleteById(Long.valueOf(tweetId));
    }else {
      //exception
    }

  }

  public TweetResponse createTweet(TweetRequest tweetRequest, HttpServletRequest request){
    UserModel user = userModelService.getUser((Long) request.getAttribute("userId")).orElse(null);
    Tweet tweet = new Tweet();
    tweet.setBody(tweetRequest.getBody());
    tweet.setTweetType(tweetRequest.getTweetType());
    tweet.setCountLikes(0);
    tweet.setCountRetweets(0);
    tweet.setCountReply(0);
    tweet.setUser(user);
    Tweet savedTweet = tweetModelRepository.save(tweet);

    TweetResponse tweetResponse = new TweetResponse();
    tweetResponse.setTweetId(savedTweet.getId());
    tweetResponse.setBody(savedTweet.getBody());
    tweetResponse.setTweetType(savedTweet.getTweetType());
    tweetResponse.setCountLikes(savedTweet.getCountLikes());
    tweetResponse.setCountRetweets(savedTweet.getCountRetweets());
    tweetResponse.setCountReply(savedTweet.getCountReply());
    tweetResponse.setUserAvatarImage(savedTweet.getUser().getAvatarImgUrl());
    tweetResponse.setUserTag(savedTweet.getUser().getUserTag());


    return tweetResponse;
  }

  public List<Tweet> allUserFollowingTweet(Long userId){
    Optional<List<UserModel>> followingUsers = tweetModelRepository.userFollowings(userId);
    return followingUsers.stream()
      .flatMap(u -> tweetModelRepository.getAllByUser((UserModel) u).stream())
      .collect(Collectors.toList());
  }

  public List<Tweet> getUserTweets(Long userId){
    return tweetModelRepository.getAllByUserId(userId);

  }

  public List<Tweet> getAllTweets(Long id){
    return tweetModelRepository.getAllByUserId(id);
  }

  public Optional<Tweet> updateTweet(Long id, TweetRequest tweetRequest){
    Optional<Tweet> tweet = findById(id);
    return tweet;
  }

}
