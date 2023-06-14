package app.facade;

import app.dto.rq.TweetRequestDTO;
import app.dto.rs.TweetResponseDTO;
import app.dto.rs.UserResponseDTO;
import app.enums.TweetType;
import app.model.AttachmentImage;
import app.model.Tweet;
import app.model.UserModel;
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
public class TweetFacade extends GeneralFacade<Tweet, Void, TweetResponseDTO>{

  @Autowired
  private TweetService tweetService;
  @Autowired
  private TweetActionService tweetActionService;
  @Autowired
  private UserFacade userFacade;

  @PostConstruct
  public void init() {
    ModelMapper mm = super.getMm();

    Converter<Set<AttachmentImage>, Set<String>> imagesToURLs = sa -> sa.getSource().stream()
      .map(AttachmentImage::getImgUrl).collect(Collectors.toSet());

//    Converter<UserModel, UserResponseDTO> userModelToUserResponseDTO = um -> userFacade.convertToDto((UserModel) um);
//    mm.addConverter(userModelToUserResponseDTO);
//
//    Converter<Tweet, TweetResponseDTO> tweetToTweetResponseDTO = t -> convertToDto((Tweet) t);
//    mm.addConverter(tweetToTweetResponseDTO);

    mm.typeMap(Tweet.class, TweetResponseDTO.class)
      .addMappings(mapper -> mapper.using(imagesToURLs).map(Tweet::getAttachmentImages, TweetResponseDTO::setAttachmentImages))
      .addMapping(tweetService::getCountReplays, TweetResponseDTO::setCountReplays)
      .addMapping(tweetService::getCountQuoteTweets, TweetResponseDTO::setCountQuoteTweets)
      .addMapping(tweetActionService::getCountLikes, TweetResponseDTO::setCountLikes)
      .addMapping(tweetActionService::getCountBookmarks, TweetResponseDTO::setCountBookmarks)
      .addMapping(tweetActionService::getCountRetweets, TweetResponseDTO::setCountRetweets);
  }


  public TweetResponseDTO createTweet(Long userId, TweetRequestDTO requestDTO){
    return convertToDto(tweetService.create(userId, requestDTO.getTweetBody(), requestDTO.getAttachmentImages(), TweetType.TWEET, null));
  }

  public TweetResponseDTO getTweetById(Long tweetId){
    return convertToDto(tweetService.getTweet(tweetId));
  }

}
