package app.dto.rs;

import app.annotations.Marker;
import app.enums.TweetType;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.HashSet;
import java.util.Set;

@Data
@Accessors(chain = true)
@ApiModel(description = "Tweet response")
public class TweetResponseDTO {

  @JsonView(Marker.Preview.class)
  private Long id;

  @JsonView(Marker.Preview.class)
  private String createdAt;

  @JsonView(Marker.Preview.class)
  private TweetType tweetType;

  @JsonView(Marker.Preview.class)
  private UserResponseMiniDTO user;

  @JsonView(Marker.Preview.class)
  private TweetResponseDTO parentTweet;

  @JsonView(Marker.Preview.class)
  private String body;

  @JsonView(Marker.Preview.class)
  private Set<AttachmentImageResponseDTO> attachmentImages = new HashSet<>();

  private boolean currUserLiked;

  private boolean currUserRetweeted;

  private boolean currUserCommented;

  private boolean currUserBookmarked;

  private Integer countReplies = 0;

  private Integer countQuoteTweets = 0;

  private Integer countRetweets = 0;

  private Integer countLikes = 0;

  private Integer countBookmarks = 0;

}
