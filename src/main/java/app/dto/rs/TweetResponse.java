package app.dto.rs;

import app.enums.TweetType;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class TweetResponse {

  private Long tweetId;
  private String body;
  private Set<String> attachmentsImages = new HashSet<>();
  private String userAvatarImage;
  private String userTag;
  private Integer countLikes;
  private Integer countRetweets;
  private Integer countReply;
  private TweetType tweetType;
  private Long parentTweetId;
}
