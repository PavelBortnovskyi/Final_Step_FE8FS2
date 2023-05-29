package app.dto.rq;

import app.annotations.Marker;
import app.enums.NotificationType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class NotificationRequest {

  @JsonView({Marker.Existed.class})
  @NotNull(message = "Id must be specified", groups = {Marker.Existed.class})
  private Long id;

  @JsonView({Marker.New.class})
  @NotNull(message = "Notification type must be specified", groups = {Marker.New.class})
  @JsonFormat(shape = JsonFormat.Shape.STRING)
  private NotificationType notificationType;

  @JsonView({Marker.New.class})
  @NotNull(message = "Receiver user must be specified", groups = {Marker.New.class})
  private Long receiverUserId;

  @JsonView({Marker.New.class})
  @NotNull(message = "Sender must be specified", groups = {Marker.New.class})
  private Long initiatorUserId;

  @JsonView({Marker.New.class})
  @NotNull(message = "Tweet must be specified", groups = {Marker.New.class})
  private Long tweetId;

  private boolean isRead = false;
}
