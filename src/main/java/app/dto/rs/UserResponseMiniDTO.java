package app.dto.rs;

import lombok.Data;

@Data
public class UserResponseMiniDTO {

  private Long id;

  private String fullName;

  private String userTag;

  private String avatarImgUrl;

  private Boolean isVerified;

}
