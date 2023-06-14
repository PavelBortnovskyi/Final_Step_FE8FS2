package app.dto.rs;

import app.annotations.Marker;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

/**
 * UserDTO for responses
 */
@Data
public class UserChatResponseDTO {

  private Long id;

  private String fullName;

  private String userTag;

  private String email;

  private String avatarImgUrl;

}
