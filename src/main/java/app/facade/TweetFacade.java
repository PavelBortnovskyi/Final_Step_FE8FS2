package app.facade;

import app.dto.rq.TweetRequestDTO;
import app.dto.rs.TweetResponseDTO;
import app.enums.TweetActionType;
import app.enums.TweetType;
import app.model.AttachmentImage;
import app.model.Tweet;
import app.service.TweetActionService;
import app.service.TweetService;
import lombok.NoArgsConstructor;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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


  @PostConstruct
  public void init() {
    ModelMapper mm = super.getMm();

    Converter<Set<AttachmentImage>, Set<String>> imagesToURLs = sa -> sa.getSource().stream()
      .map(AttachmentImage::getImgUrl).collect(Collectors.toSet());

    mm.typeMap(Tweet.class, TweetResponseDTO.class)
      .addMappings(mapper -> mapper.using(imagesToURLs).map(Tweet::getAttachmentImages, TweetResponseDTO::setAttachmentImages))
      .addMapping(src -> src.getParentTweet().getId(), TweetResponseDTO::setParentTweetId);
  }


  @Override
  public TweetResponseDTO convertToDto(Tweet tweet) {
    return super.convertToDto(tweet)
      .setCountReplays(tweetService.getCountReplays(tweet))
      .setCountQuoteTweets(tweetService.getCountQuoteTweets(tweet))
      .setCountLikes(tweetActionService.getCountLikes(tweet))
      .setCountBookmarks(tweetActionService.getCountBookmarks(tweet))
      .setCountRetweets(tweetActionService.getCountRetweets(tweet));
  }


  public TweetResponseDTO createTweet(Long userId, TweetRequestDTO requestDTO, TweetType tweetType, Long parentTweetId) {
    return convertToDto(tweetService
      .createTweet(userId, requestDTO.getTweetBody(), requestDTO.getAttachmentImages(), tweetType, parentTweetId));
  }


  public void deleteTweet(Long userId, Long tweetId){
    tweetService.deleteTweet(userId, tweetId);
  }


  public TweetResponseDTO createTweetAction(Long userId, Long tweetId, TweetActionType tweetActionType){
    return convertToDto(tweetService
      .createTweetAction(userId, tweetId, tweetActionType));
  }


  public TweetResponseDTO removeTweetAction(Long userId, Long tweetId, TweetActionType tweetActionType){
    return convertToDto(tweetService
      .removeTweetAction(userId, tweetId, tweetActionType));
  }





  public TweetResponseDTO getTweetById(Long tweetId) {
    return convertToDto(tweetService.getTweet(tweetId));
  }

}
