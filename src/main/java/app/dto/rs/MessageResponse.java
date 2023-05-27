package app.dto.rs;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@ApiModel(description = "Message response")
public class MessageResponse {

  private Long chatId;

  private Long userId;

  private String body;

  private LocalDateTime sent;
}
