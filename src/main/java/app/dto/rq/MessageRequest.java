package app.dto.rq;

import app.model.Chat;
import app.model.UserModel;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class MessageRequest {

  @NotNull(message = "Chat id must be specified")
  private Chat chat;

  @NotNull(message = "Message author must be specified")
  private UserModel user;

  @NotEmpty(message = "Message body must be not empty")
  private String body;

  private LocalDateTime sent = LocalDateTime.now();

}
