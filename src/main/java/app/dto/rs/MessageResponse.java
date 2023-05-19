package app.dto.rs;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageResponse {

  private Long chatId;
  private Long userId;
  private String body;
  private LocalDateTime sent;
}
