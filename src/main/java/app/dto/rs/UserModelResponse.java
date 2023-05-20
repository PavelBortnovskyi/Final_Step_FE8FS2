package app.dto.rs;

import app.annotations.Details;
import app.annotations.Existed;
import app.annotations.New;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.time.LocalDate;


/**
 * UserDTO for responses
 */
@Data
public class UserModelResponse {

  @Null(groups = {New.class})
  @NotNull(groups = {Existed.class})
  @JsonView({Details.class})
  private Long id;

  @NotNull(groups = {Existed.class, New.class})
  @JsonView({Details.class})
  private String fullName;

  @NotNull(groups = {Existed.class, New.class})
  @JsonView({Details.class})
  private String userTag;

  @NotNull(groups = {Existed.class, New.class})
  @Email(groups = {Existed.class, New.class})
  @JsonView({Details.class})
  private String email;

  @NotNull(groups = {Existed.class, New.class})
  @JsonView({Details.class})
  private LocalDate birthdate;

  @Null(groups = {New.class})
  @JsonView({Details.class})
  private String bio;

  @Null(groups = {New.class})
  private String location;

  @Null(groups = {New.class})
  @NotNull(groups = {Existed.class})
  @JsonView({Details.class})
  private String avatarImgUrl;

  @Null(groups = {New.class})
  @NotNull(groups = {Existed.class})
  @JsonView({Details.class})
  private String headerImgUrl;

  @NotNull(groups = {Existed.class, New.class})
  @JsonView({Details.class})
  private boolean isVerified;

  @Null(groups = {New.class})
  private Integer countUserFollowers;

  @Null(groups = {New.class})
  private Integer countUserFollowings;
}
