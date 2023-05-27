package app.facade;

import app.dto.rq.TweetRequest;
import app.dto.rs.TweetResponse;
import app.exceptions.tweetError.TweetIsNotFoundException;
import app.model.Tweet;
import app.service.TweetActionService;
import app.service.TweetService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@Component
@NoArgsConstructor
public class TweetFacade extends GeneralFacade<Tweet, TweetRequest, TweetResponse> {
  @Autowired
  TweetService tweetService;

  @Autowired
  TweetActionService tweetActionService;

  @PostConstruct
  public void init() {
    super.getMm().typeMap(Tweet.class, TweetResponse.class)
      .addMapping(src -> src.getBody(), TweetResponse::setBody)
      .addMapping(src -> src.getId(), TweetResponse::setTweetId)
      .addMapping(src -> src.getAttachmentImages(), TweetResponse::setAttachmentsImages)
      .addMapping(src -> src.getUser().getUserTag(), TweetResponse::setUserTag)
      .addMapping(src -> src.getUser().getAvatarImgUrl(), TweetResponse::setUserAvatarImage)
      .addMapping(src -> src.getParentTweetId().getId(), TweetResponse::setParentTweetId)
      .addMapping(this::getCountLikes, TweetResponse::setCountLikes)
      .addMapping(this::getCountReply, TweetResponse::setCountReply)
      .addMapping(this::getCountRetweet, TweetResponse::setCountRetweets);
  }

  private Integer getCountLikes(Tweet tweet) {
    return tweetActionService.getCountLikes(tweet.getId());
  }

  private Integer getCountReply(Tweet tweet) {
    return tweetService.getCountReply(tweet.getId());
  }

  private Integer getCountRetweet(Tweet tweet) {
    return tweetActionService.getCountRetweet(tweet.getId());
  }

  public TweetResponse getTweetById(Long tweetId) {
    TweetResponse tweetResponse = tweetService.getTweet(tweetId).map(this::convertToDto)
      .orElseThrow(() -> new TweetIsNotFoundException(tweetId));
    tweetResponse.setCountRetweets(tweetActionService.getCountRetweet(tweetResponse.getTweetId()));
    tweetResponse.setCountLikes(tweetActionService.getCountLikes(tweetResponse.getTweetId()));
    tweetResponse.setCountReply(tweetService.getCountReply(tweetResponse.getTweetId()));
    return tweetResponse;
  }

  public TweetResponse updateTweet(Long tweetId, TweetRequest tweetRequest) {
    return tweetService.updateTweet(tweetId, tweetRequest).map(this::convertToDto)
      .orElseThrow(() -> new TweetIsNotFoundException(tweetId));
  }

  public List<TweetResponse> getUserTweets(Long userId, int page, int pageSize) {
    ResponseEntity<List<Tweet>> responseEntity = tweetService.getUserTweets(userId, page, pageSize);

    List<Tweet> tweets = responseEntity.getBody();

    List<TweetResponse> tweetResponses = tweets.stream()
      .map(this::convertToDto)
      .collect(Collectors.toList());


    return tweetResponses;
  }

  public List<TweetResponse> allUserFollowingTweet(HttpServletRequest request, int page, int pageSize) {
    ResponseEntity<List<Tweet>> responseEntity = tweetService.allUserFollowingTweet(request, page, pageSize);

    List<Tweet> tweets = responseEntity.getBody();

    List<TweetResponse> tweetResponses = tweets.stream()
      .map(this::convertToDto)
      .collect(Collectors.toList());


    return tweetResponses;
  }

  public List<TweetResponse> getAllBookmarksTweet(HttpServletRequest request, int page, int pageSize) {
    ResponseEntity<List<Tweet>> responseEntity = tweetService.getAllBookmarks(request, page, pageSize);

    List<Tweet> tweets = responseEntity.getBody();

    List<TweetResponse> tweetResponses = tweets.stream()
      .map(this::convertToDto)
      .collect(Collectors.toList());


    return tweetResponses;
  }



  @Override
  public Tweet convertToEntity(TweetRequest dto) {
    Tweet sample = new Tweet();
    super.getMm().map(dto, sample);
    return sample;
  }
}
