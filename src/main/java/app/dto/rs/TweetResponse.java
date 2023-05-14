package app.dto.rs;

import app.dto.rq.TweetRequest;
import app.model.*;
import lombok.Data;
import java.util.Set;

@Data
public class TweetResponse {
  public TweetResponse(String body){
    this.body = body;
  }

  private String body;
  private Set<String> attachments;
  private String userAvatarImage;
  private String userTag;
  private Integer countLikes;
  private Integer countRetweets;
  private Tweet parentTweet;

}
