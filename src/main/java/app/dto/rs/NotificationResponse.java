package app.dto.rs;

import app.enums.NotificationType;
import lombok.Data;

@Data
public class NotificationResponse {

    private NotificationType notificationType;
    private Long receiverId;
    private Long initiatorId;
    private Long tweetId;
    private boolean isRead;
}
