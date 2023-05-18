package app.dto.rq;

import app.annotations.New;
import app.model.Chat;
import app.model.UserModel;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.time.LocalDateTime;

@Data
public class MessageRequest {

  @NotNull(message = "Chat id must be specified", groups = New.class)
  private Chat chat;

  @NotNull(message = "Message author must be specified", groups = New.class)
  private UserModel user;

  @NotEmpty(message = "Message body must be not empty", groups = New.class)
  private String body;

  @Null
  private LocalDateTime sent = LocalDateTime.now();

}
