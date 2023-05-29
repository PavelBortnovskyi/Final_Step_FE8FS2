package app.dto.rs;

import app.annotations.Marker;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@ApiModel(description = "Message response")
public class MessageResponse {

  @JsonView(Marker.ChatDetails.class)
  private Long messageId;

  @JsonView(Marker.ChatDetails.class)
  private Long chatId;

  @JsonView(Marker.ChatDetails.class)
  private Long userId;

  @JsonView(Marker.ChatDetails.class)
  private String body;

  @JsonView(Marker.ChatDetails.class)
  private LocalDateTime sent;
}
