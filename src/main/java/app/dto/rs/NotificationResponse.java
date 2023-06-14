package app.dto.rs;

import app.annotations.Marker;
import app.enums.NotificationType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

@Data
public class NotificationResponse {

  private Long id;

  @JsonFormat(shape = JsonFormat.Shape.STRING)
  private NotificationType notificationType;

  private Long receiverId;

  private Long initiatorId;

  private Long tweetId;

  private boolean isRead;
}
