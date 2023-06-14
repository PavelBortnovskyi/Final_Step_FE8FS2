package app.dto.rs;

import app.annotations.Marker;
import app.enums.TweetType;
import app.model.AttachmentImage;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@ApiModel("Tweet DTO for Notifications")
public class TweetNotificationResponse {

  private Long tweetId;

  private String body;

  private Set<AttachmentImageResponse> attachmentsImages;

  private String userAvatarImage;

  private String userTag;

  private TweetType tweetType;

  private Long parentTweetId;
}
