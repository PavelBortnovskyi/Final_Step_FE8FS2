package app.facade;

import app.dto.rq.TweetRequest;
import app.dto.rs.TweetResponse;
import app.exceptions.tweetError.TweetIsNotFoundException;
import app.model.AttachmentImage;
import app.model.Tweet;
import app.service.TweetActionService;
import app.service.TweetService;
import app.utils.ratingAlgo.ScheduleAlgo;
import lombok.NoArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.modelmapper.Converter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@NoArgsConstructor
public class TweetFacade extends GeneralFacade<Tweet, TweetRequest, TweetResponse> {
  @Autowired
  TweetService tweetService;

  @Autowired
  TweetActionService tweetActionService;

  @Autowired
  ScheduleAlgo scheduleAlgo;

/*  @Autowired
  ViewedInfoService viewedInfoService;*/


  @PostConstruct
  public void init() {
    Converter<Set<AttachmentImage>, Set<String>> imagesToURL = sa -> sa.getSource().stream()
      .map(AttachmentImage::getImgUrl).collect(Collectors.toSet());

    super.getMm().typeMap(Tweet.class, TweetResponse.class)
      .addMapping(src -> src.getBody(), TweetResponse::setBody)
      .addMapping(src -> src.getId(), TweetResponse::setTweetId)
      .addMapping(src -> src.getUser().getUserTag(), TweetResponse::setUserTag)
      .addMapping(src -> src.getUser().getAvatarImgUrl(), TweetResponse::setUserAvatarImage)
      .addMapping(src -> src.getParentTweetId().getId(), TweetResponse::setParentTweetId)
      .addMappings(mapper -> mapper.using(imagesToURL).map(Tweet::getAttachmentImages, TweetResponse::setAttachmentsImages))
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

  private Set<String> getImagesUrl(Tweet tweet) {
    return tweetService.getTweet(tweet.getId())
      .map(Tweet::getAttachmentImages)
      .map(imageSet -> imageSet.stream()
        .map(AttachmentImage::getImgUrl).collect(Collectors.toSet())).orElse(new HashSet<>());
  }

  public TweetResponse getTweetById(Long tweetId, HttpServletRequest request) {
    TweetResponse tweetResponse = tweetService.getTweet(tweetId).map(this::convertToDto)
      .orElseThrow(() -> new TweetIsNotFoundException(tweetId));
    tweetResponse.setCountRetweets(tweetActionService.getCountRetweet(tweetResponse.getTweetId()));
    tweetResponse.setCountLikes(tweetActionService.getCountLikes(tweetResponse.getTweetId()));
    tweetResponse.setCountReply(tweetService.getCountReply(tweetResponse.getTweetId()));

    //viewedInfoService.addView(tweetService.getTweet(tweetId).get(), request);
    return tweetResponse;
  }

  public TweetResponse updateTweet(Long tweetId, TweetRequest tweetRequest) {
    return tweetService.updateTweet(tweetId, tweetRequest).map(this::convertToDto)
      .orElseThrow(() -> new TweetIsNotFoundException(tweetId));
  }

  public Page<TweetResponse> getUserTweets(Long userId, int page, int pageSize) {
    return tweetService.getUserTweets(userId, page, pageSize).map(this::convertToDto);
  }

  public List<TweetResponse> listTweets(int page, int pageSize) {
    ResponseEntity<List<Tweet>> responseEntity = tweetService.listTweets(page, pageSize);

    List<Tweet> tweets = responseEntity.getBody();
    List<TweetResponse> tweetResponses = tweets.stream()
      .map(this::convertToDto)
      .toList();
    return tweetResponses;
  }

  public List<TweetResponse> listTopTweets(int page, int pageSize) {
    ResponseEntity<List<Tweet>> responseEntity = scheduleAlgo.listTopTweets(page, pageSize);

    List<Tweet> tweets = responseEntity.getBody();
    List<TweetResponse> tweetResponses = tweets.stream()
      .map(this::convertToDto)
      .toList();
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
