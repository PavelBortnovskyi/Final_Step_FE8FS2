package app.dto.rs;

import app.enums.TweetType;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.HashSet;
import java.util.Set;

@Data
@Accessors(chain = true)
@ApiModel(description = "Tweet mini response")
public class TweetResponseMiniDTO {

  private Long id;

  private String createdAt;

  private TweetType tweetType;

  private UserResponseMiniDTO user;

  private String body;

  private Set<AttachmentImageResponse> attachmentImages = new HashSet<>();

}
