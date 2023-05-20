package app.dto.rs;

import app.annotations.Marker;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageResponse {

  private Long chatId;

  @JsonView({Marker.ChatDetails.class})
  private Long userId;

  @JsonView({Marker.ChatDetails.class})
  private String body;

  @JsonView({Marker.ChatDetails.class})
  private LocalDateTime sent;
}
