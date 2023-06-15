package app.facade;

import app.dto.rq.TweetRequestDTO;
import app.dto.rs.TweetResponseDTO;
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
      .addMappings(mapper -> mapper.using(imagesToURLs).map(Tweet::getAttachmentImages, TweetResponseDTO::setAttachmentImages));
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


  public TweetResponseDTO createTweet(Long userId, TweetRequestDTO requestDTO) {
    return convertToDto(tweetService
      .create(userId, requestDTO.getTweetBody(), requestDTO.getAttachmentImages(), TweetType.TWEET, null));
  }


  public TweetResponseDTO getTweetById(Long tweetId) {
    return convertToDto(tweetService.getTweet(tweetId));
  }

}
