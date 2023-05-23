package app.dto.rs;

import app.model.Tweet;
import lombok.Data;

import java.util.Set;

@Data
public class TweetResponse {

  private Long tweetId;
  private String body;
  private Set<String> attachmentsImages;
  private String userAvatarImage;
  private String userTag;
  private Integer countLikes;
  private Integer countRetweets;
  private Integer countReply;
  private Tweet parentTweet;
}
