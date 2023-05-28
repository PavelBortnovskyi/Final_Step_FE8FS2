package app.dto.rq;

import app.annotations.Marker;
import app.enums.NotificationType;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class NotificationRequest {


  @NotNull(message = "Notification type must be specified", groups = {Marker.New.class})
  private NotificationType notificationType;

  @NotNull(message = "Receiver user must be specified", groups = {Marker.New.class})
  private Long receiverUserId;

  @NotNull(message = "Sender must be specified", groups = {Marker.New.class})
  private Long initiatorUserId;

  @NotNull(message = "Tweet must be specified", groups = {Marker.New.class})
  private Long tweetId;

  private boolean isRead = false;
}
