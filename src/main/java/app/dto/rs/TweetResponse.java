package app.dto.rs;

import app.model.*;
import lombok.Data;
import java.util.Set;

@Data
public class TweetResponse {
  private String body;
  private Set<String> attachments;
  private String userAvatarImage;
  private String userTag;
  private Integer countLikes;
  private Integer countRetweets;
  private Tweet parentTweet;

}
