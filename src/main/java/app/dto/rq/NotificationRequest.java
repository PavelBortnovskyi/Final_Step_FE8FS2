package app.dto.rq;

import app.annotations.New;
import app.enums.NotificationType;
import app.model.Tweet;
import app.model.UserModel;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class NotificationRequest {

  @NotNull(message = "Notification type must be specified")
  private NotificationType notificationType;

  @NotNull(message = "Receiver user must be specified")
  private UserModel receiverUser;

  @NotNull(message = "Sender must be specified")
  private UserModel initiatorUser;

  @NotNull(message = "Tweet must be specified")
  private Tweet tweet;

  private boolean isRead = false;
}
