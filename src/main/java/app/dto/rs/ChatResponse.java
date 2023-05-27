package app.dto.rs;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class ChatResponse {

  private Long chatId;

  private Long initiatorUserId;

  private List<MessageResponse> messages;

  private Set<UserModelResponse> users;
}
