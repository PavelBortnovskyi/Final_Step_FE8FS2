package app.service;

import app.dto.rq.TweetRequest;
import app.dto.rs.TweetResponse;
import app.enums.TweetType;
import app.exceptions.userError.NotFoundExceptionException;
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
  private final TweetActionService tweetActionService;
  private final UserModelService userModelService;

  public Optional<Tweet> getTweet(Long id){
    Optional<Tweet> tweet = findById(id);
    return tweet;
  }

  public void deleteTweet(String tweetId, HttpServletRequest request) {
    Optional<Tweet> tweet = tweetModelRepository.findById(Long.valueOf(tweetId));
    if (tweet.isPresent() && tweet.get().getUser().getId().equals(request.getAttribute("userId"))) {
      tweetModelRepository.deleteById(Long.valueOf(tweetId));
    }else {
      //exception
    }

  }

  public TweetResponse create(TweetRequest tweetRequest, HttpServletRequest request, Long parentTweetId, TweetType tweetType){
    UserModel user = userModelService.getUser((Long) request.getAttribute("userId")).orElse(null);
    Tweet tweet = new Tweet();
    tweet.setBody(tweetRequest.getBody());
    tweet.setTweetType(tweetType);

    tweet.setUser(user);
    tweet.setParentTweetId(findById(parentTweetId).orElseThrow(() -> new NotFoundExceptionException(parentTweetId)));
    Tweet savedTweet = tweetModelRepository.save(tweet);

    TweetResponse tweetResponse = new TweetResponse();
    tweetResponse.setTweetId(savedTweet.getId());
    tweetResponse.setBody(savedTweet.getBody());
    tweetResponse.setTweetType(tweetType);
    tweetResponse.setCountLikes(tweetActionService.getCountLikes(tweet.getId()));
    tweetResponse.setUserAvatarImage(savedTweet.getUser().getAvatarImgUrl());
    tweetResponse.setUserTag(savedTweet.getUser().getUserTag());
    tweetResponse.setParentTweetId(parentTweetId);


    return tweetResponse;
  }

  public TweetResponse createTweet(TweetRequest tweetRequest, HttpServletRequest request){
    return create(tweetRequest, request, null, TweetType.TWEET);
  }

  public TweetResponse createRetweet(TweetRequest tweetRequest, HttpServletRequest request, Long tweetId){
    return create(tweetRequest, request, tweetId, TweetType.QUOTE_TWEET);
  }

  public TweetResponse createReply(TweetRequest tweetRequest, HttpServletRequest request, Long tweetId){
    return create(tweetRequest, request, tweetId, TweetType.REPLY);
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

  //TODO: finish update method
  public Optional<Tweet> updateTweet(Long id, TweetRequest tweetRequest){
    Optional<Tweet> tweet = findById(id);
    return tweet;
  }

}
