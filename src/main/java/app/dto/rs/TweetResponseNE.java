package app.dto.rs;

import app.annotations.Marker;
import app.enums.TweetType;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import java.util.Set;

@Data
public class TweetResponseNE {

  @JsonView(Marker.Preview.class)
  private Long tweetId;

  @JsonView(Marker.Preview.class)
  private String body;

  @JsonView(Marker.Preview.class)
  private Set<String> attachmentsImages;

  @JsonView(Marker.Preview.class)
  private String userAvatarImage;

  @JsonView(Marker.Preview.class)
  private String userTag;

  private Integer countLikes;

  private Integer countRetweets;

  private Integer countReply;

  @JsonView(Marker.Preview.class)
  private TweetType tweetType;

  @JsonView(Marker.Preview.class)
  private TweetResponseNE parentTweet;
}
