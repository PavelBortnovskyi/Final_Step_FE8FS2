package app.dto.rs;

import app.annotations.Marker;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@ApiModel(description = "Chat response")
public class ChatResponseDTO {

  @JsonView(Marker.ChatDetails.class)
  private Long chatId;

  @JsonView(Marker.ChatDetails.class)
  private UserResponseDTO initiatorUser;

  @JsonView(Marker.ChatDetails.class)
  private List<MessageResponseDTO> messages;

  @JsonView(Marker.ChatDetails.class)
  private Set<UserResponseDTO> users;
}
