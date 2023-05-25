package app.facade;

import app.dto.rq.TweetRequest;
import app.dto.rs.TweetResponse;
import app.exceptions.tweetError.TweetIsNotFoundException;
import app.model.Tweet;
import app.service.TweetActionService;
import app.service.TweetService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

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
      .addMapping(src -> tweetActionService.getCountLikes(src.getId()), TweetResponse::setCountLikes)
      .addMapping(src -> tweetActionService.getCountRetweet(src.getId()), TweetResponse::setCountRetweets);
  }

  public TweetResponse getTweetById(Long tweetId) {
    return tweetService.getTweet(tweetId).map(this::convertToDto)
      .orElseThrow(() -> new TweetIsNotFoundException(tweetId));
  }

  public TweetResponse updateTweet(Long tweetId, TweetRequest tweetRequest) {
    return tweetService.updateTweet(tweetId, tweetRequest).map(this::convertToDto)
      .orElseThrow(() -> new TweetIsNotFoundException(tweetId));
  }

  public List<TweetResponse> getUserTweets(Long userId) {
    ResponseEntity<List<Tweet>> responseEntity = tweetService.getUserTweets(userId);

    List<Tweet> tweets = responseEntity.getBody();

    List<TweetResponse> tweetResponses = tweets.stream()
      .map(this::convertToDto)
      .collect(Collectors.toList());


    return tweetResponses;
  }

  public List<TweetResponse> allUserFollowingTweet(HttpServletRequest request, Integer pageNumber) {
    ResponseEntity<List<Tweet>> responseEntity = tweetService.allUserFollowingTweet(request, pageNumber);

    List<Tweet> tweets = responseEntity.getBody();

    List<TweetResponse> tweetResponses = tweets.stream()
      .map(this::convertToDto)
      .collect(Collectors.toList());


    return tweetResponses;
  }

  public List<TweetResponse> getAllBookmarksTweet(HttpServletRequest request) {
    ResponseEntity<List<Tweet>> responseEntity = tweetService.getAllBookmarks(request);

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
