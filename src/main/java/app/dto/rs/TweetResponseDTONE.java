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
public class TweetResponseDTONE {

  @JsonView(Marker.Preview.class)
  private Long id;

  @JsonView(Marker.Preview.class)
  private String createdAt;

  @JsonView(Marker.Preview.class)
  private TweetType tweetType;

  @JsonView(Marker.Preview.class)
  private UserResponseDTO user;

  @JsonView(Marker.Preview.class)
  private String body;

  @JsonView(Marker.Preview.class)
  private Set<AttachmentImageResponseDTO> attachmentImages = new HashSet<>();

  @JsonView(Marker.Preview.class)
  private TweetResponseDTONEmini parentTweet;
}
