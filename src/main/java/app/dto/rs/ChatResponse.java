package app.dto.rs;

import app.annotations.Marker;
import app.model.Message;
import app.model.UserModel;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class ChatResponse {
  @JsonView(Marker.ChatDetails.class)
  private Long chatId;

  @JsonView(Marker.ChatDetails.class)
  private Long initiatorUserId;

  @JsonView(Marker.ChatDetails.class)
  private List<MessageResponse> messages;

  @JsonView(Marker.ChatDetails.class)
  private Set<UserModelResponse> users;
}
