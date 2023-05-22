package app.dto.rs;

import app.annotations.Marker;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import javax.validation.constraints.Null;
import java.time.LocalDate;


/**
 * UserDTO for responses
 */
@Data
public class UserModelResponse {

  @JsonView({Marker.Details.class, Marker.ChatDetails.class})
  private Long id;

  @JsonView({Marker.Details.class, Marker.ChatDetails.class})
  private String fullName;

  @JsonView({Marker.Details.class, Marker.ChatDetails.class})
  private String userTag;

  @JsonView({Marker.Details.class})
  @Null(groups = Marker.ChatDetails.class)
  private String email;

  @JsonView({Marker.Details.class})
  @Null(groups = Marker.ChatDetails.class)
  private LocalDate birthdate;

  @JsonView({Marker.Details.class})
  @Null(groups = Marker.ChatDetails.class)
  private String bio;

  @JsonView({Marker.Details.class})
  @Null(groups = Marker.ChatDetails.class)
  private String location;

  @JsonView({Marker.Details.class, Marker.ChatDetails.class})
  private String avatarImgUrl;

  @JsonView({Marker.Details.class})
  @Null(groups = Marker.ChatDetails.class)
  private String headerImgUrl;

  @JsonView({Marker.Details.class, Marker.ChatDetails.class})
  private boolean isVerified;

  @JsonView({Marker.Details.class})
  @Null(groups = Marker.ChatDetails.class)
  private Integer countUserFollowers;

  @JsonView({Marker.Details.class})
  @Null(groups = Marker.ChatDetails.class)
  private Integer countUserFollowings;
}
