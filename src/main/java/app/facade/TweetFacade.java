package app.facade;

import app.dto.rq.TweetRequest;
import app.dto.rs.TweetResponse;
import app.model.Tweet;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@NoArgsConstructor
public class TweetFacade extends GeneralFacade<Tweet, TweetRequest, TweetResponse> {
  @PostConstruct
  public void init() {
    super.getMm().typeMap(Tweet.class, TweetResponse.class)
      .addMapping(src -> src.getBody(), TweetResponse::setBody)
      .addMapping(src -> src.getId(), TweetResponse::setTweetId)
      .addMapping(src -> src.getAttachmentImages(), TweetResponse::setAttachmentsImages)
      .addMapping(src -> src.getUser().getUserTag(), TweetResponse::setUserTag)
      .addMapping(src -> src.getUser().getAvatarImgUrl(), TweetResponse::setUserAvatarImage)
      .addMapping(src -> src.getCountLikes(), TweetResponse::setCountLikes)
      .addMapping(src -> src.getCountRetweets(), TweetResponse::setCountRetweets)
      .addMapping(src -> src.getCountReply(), TweetResponse::setCountReply)
      .addMapping(src -> src.getParentTweet(), TweetResponse::setParentTweet);
  }

  @Override
  public Tweet convertToEntity(TweetRequest dto) {
    Tweet sample = new Tweet();
    super.getMm().map(dto, sample);
    return sample;
  }
}
