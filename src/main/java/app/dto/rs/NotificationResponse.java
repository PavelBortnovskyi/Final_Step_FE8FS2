package app.dto.rs;

import app.annotations.Marker;
import app.enums.NotificationType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

@Data
public class NotificationResponse {

  @JsonView(Marker.Preview.class)
  private Long id;

  @JsonView(Marker.Preview.class)
  @JsonFormat(shape = JsonFormat.Shape.STRING)
  private NotificationType notificationType;

  @JsonView(Marker.Preview.class)
  private UserResponseDTO receiver;

  @JsonView(Marker.Preview.class)
  private UserResponseDTO initiator;

  @JsonView(Marker.Preview.class)
  private TweetResponse tweet;

  @JsonView(Marker.Preview.class)
  private boolean isRead;
}
