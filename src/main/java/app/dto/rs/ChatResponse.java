package app.dto.rs;

import app.annotations.Marker;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@ApiModel(description = "Chat response")
public class ChatResponse {

  private Long chatId;

  private UserChatResponseDTO initiatorUser;

  private List<MessageResponse> messages;

  private Set<UserChatResponseDTO> users;
}
