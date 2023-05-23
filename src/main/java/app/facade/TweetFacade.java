package app.facade;

import app.dto.rq.TweetRequest;
import app.dto.rs.TweetResponse;
import app.exceptions.userError.NotFoundExceptionException;
import app.model.Tweet;
import app.service.TweetService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@NoArgsConstructor
public class TweetFacade extends GeneralFacade<Tweet, TweetRequest, TweetResponse> {
  @Autowired
  TweetService tweetService;
  @PostConstruct
  public void init() {
    super.getMm().typeMap(Tweet.class, TweetResponse.class)
      .addMapping(src -> src.getBody(), TweetResponse::setBody)
      .addMapping(src -> src.getId(), TweetResponse::setTweetId)
      .addMapping(src -> src.getAttachmentImages(), TweetResponse::setAttachmentsImages)
      .addMapping(src -> src.getUser().getUserTag(), TweetResponse::setUserTag)
      .addMapping(src -> src.getUser().getAvatarImgUrl(), TweetResponse::setUserAvatarImage)
      .addMapping(src -> src.getParentTweetId().getId(), TweetResponse::setParentTweetId);
  }

  public TweetResponse getTweetById(Long tweetId) {
    return tweetService.getTweet(tweetId).map(this::convertToDto)
      .orElseThrow(() -> new NotFoundExceptionException(tweetId));
  }

  public TweetResponse updateTweet(Long tweetId, TweetRequest tweetRequest){
    return tweetService.updateTweet(tweetId, tweetRequest).map(this::convertToDto)
      .orElseThrow(() -> new NotFoundExceptionException(tweetId));
  }

  @Override
  public Tweet convertToEntity(TweetRequest dto) {
    Tweet sample = new Tweet();
    super.getMm().map(dto, sample);
    return sample;
  }
}
