package app.dto.rs;

import app.annotations.Marker;
import app.enums.NotificationType;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

@Data
public class NotificationResponse {

  @JsonView({Marker.Existed.class})
  private NotificationType notificationType;

  @JsonView({Marker.Existed.class})
  private Long receiverId;

  @JsonView({Marker.Existed.class})
  private Long initiatorId;

  @JsonView({Marker.Existed.class})
  private Long tweetId;

  @JsonView({Marker.Existed.class})
  private boolean isRead;
}
