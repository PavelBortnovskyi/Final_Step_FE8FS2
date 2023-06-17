package app.facade;

import app.dto.rs.TweetResponseDTO;
import app.enums.TweetActionType;
import app.enums.TweetType;
import app.model.AttachmentImage;
import app.model.Tweet;
import app.service.NotificationService;
import app.service.TweetActionService;
import app.service.TweetService;
import lombok.NoArgsConstructor;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@NoArgsConstructor
public class TweetFacade extends GeneralFacade<Tweet, Void, TweetResponseDTO> {

  @Autowired
  private TweetService tweetService;
  @Autowired
  private TweetActionService tweetActionService;

  @Autowired
  private NotificationService notificationService;

  @PostConstruct
  public void init() {
    ModelMapper mm = super.getMm();

    Converter<Set<AttachmentImage>, Set<String>> imagesToURLs = sa -> sa.getSource().stream()
      .map(AttachmentImage::getImgUrl).collect(Collectors.toSet());
//
//    mm.typeMap(Tweet.class, TweetResponseDTO.class)
//      .addMappings(mapper -> mapper.using(imagesToURLs).map(Tweet::getAttachmentImages, TweetResponseDTO::setAttachmentImages))
//      .addMapping(src -> src.getParentTweet().getId(), TweetResponseDTO::setParentTweetId);
  }


  @Override
  public TweetResponseDTO convertToDto(Tweet tweet) {
    return super.convertToDto(tweet)
      .setCountReplays(tweetService.getCountReplays(tweet))
      .setCountQuoteTweets(tweetService.getCountQuoteTweets(tweet))
      .setCountRetweets(tweetService.getCountRetweetTweets(tweet))
      .setCountLikes(tweetActionService.getCountLikes(tweet))
      .setCountBookmarks(tweetActionService.getCountBookmarks(tweet));
  }


  public TweetResponseDTO createTweet(Long userId, String tweetBody, MultipartFile[] attachmentImages, TweetType tweetType, Long parentTweetId) {
    return convertToDto(notificationService.sendNotification(tweetService
      .createTweet(userId, tweetBody, attachmentImages, tweetType, parentTweetId), userId, null));
  }


  public TweetResponseDTO getTweetById(Long tweetId) {
    return convertToDto(tweetService.getTweet(tweetId));
  }


  public void deleteTweet(Long userId, Long tweetId) {
    tweetService.deleteTweet(userId, tweetId);
  }


  public TweetResponseDTO createTweetAction(Long userId, Long tweetId, TweetActionType tweetActionType) {
    return convertToDto(notificationService.sendNotification(tweetActionService
      .createTweetAction(userId, tweetId, tweetActionType).getTweet(), userId, tweetActionType));
  }


  public TweetResponseDTO removeTweetAction(Long userId, Long tweetId, TweetActionType tweetActionType) {
    return convertToDto(tweetActionService
      .removeTweetAction(userId, tweetId, tweetActionType).getTweet());
  }


  public Page<TweetResponseDTO> getAllTweetsByUserId(Long userId, Pageable pageable) {
    return tweetService.getAllTweetsByUserId(userId, pageable).map(this::convertToDto);
  }


  public Page<TweetResponseDTO> getTweetsOfTweet(Long tweetId, TweetType tweetType, Pageable pageable) {
    return tweetService.getTweetsOfTweet(tweetId, tweetType, pageable).map(this::convertToDto);
  }


  public Page<TweetResponseDTO> getAllTweets(Pageable pageable) {
    return tweetService.getAllTweets(pageable).map(this::convertToDto);
  }

  public Page<TweetResponseDTO> getTweetsFromSubscriptions(Long userId, Pageable pageable) {
    return tweetService.getTweetsFromSubscriptions(userId, pageable).map(this::convertToDto);
  }

}
