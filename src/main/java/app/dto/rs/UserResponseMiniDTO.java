package app.dto.rs;

import app.annotations.Marker;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

@Data
public class UserResponseMiniDTO {

  @JsonView(Marker.Preview.class)
  private Long id;

  @JsonView({Marker.Preview.class})
  private String fullName;

  @JsonView(Marker.Preview.class)
  private String userTag;

  @JsonView(Marker.Preview.class)
  private String avatarImgUrl;

  @JsonView(Marker.Preview.class)
  private Boolean isVerified;
}
