package app.dto.rq;

import app.annotations.Marker;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.*;
import java.time.LocalDate;

/**
 * UserDTO for login(Existed)/register(New) requests
 */
@Data
@ApiModel(description = "User model request")
public class UserRequestDTO {

  @JsonView({Marker.New.class, Marker.Update.class})
  @ApiModelProperty(value = "Full name", example = "John Doe", required = true, allowableValues = "range[2, 20]")
  @Size(max = 20, min = 2, message = "Full name length must be in range 2..20 characters", groups = {Marker.Existed.class, Marker.New.class, Marker.Update.class})
  @NotNull(groups = {Marker.New.class, Marker.Update.class})
  private String fullName;

  @JsonView({Marker.New.class, Marker.Update.class})
  @ApiModelProperty(value = "User tag", example = "@john_doe", required = true, allowableValues = "range[2, 20]")
  @Size(max = 20, min = 2, message = "UserTag length must be in range 2..20 characters", groups = {Marker.Existed.class, Marker.New.class, Marker.Update.class})
  @NotNull(groups = {Marker.New.class, Marker.Update.class})
  private String userTag;

  @JsonView({Marker.Existed.class, Marker.New.class, Marker.PasswordUpdate.class, Marker.PasswordReset.class})
  @ApiModelProperty(value = "Email", example = "john.doe@example.com", required = true, allowableValues = "range[6, 50]")
  @Size(min = 6, max = 50, message = "Max email length is 50 characters", groups = {Marker.Existed.class, Marker.New.class, Marker.PasswordReset.class, Marker.PasswordUpdate.class})
  @Pattern(regexp = "^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$", message = "Invalid email format", groups = {Marker.Existed.class, Marker.New.class, Marker.PasswordReset.class, Marker.PasswordUpdate.class})
  private String email;

  @JsonView({Marker.Existed.class, Marker.New.class, Marker.PasswordUpdate.class})
  @ApiModelProperty(value = "Password", example = "password123", required = true, allowableValues = "range[8, 50]")
  @Size(min = 8, max = 50, message = "Password length must be in range 8..50 characters", groups = {Marker.Existed.class, Marker.New.class, Marker.PasswordUpdate.class})
  @Null(groups = {Marker.PasswordReset.class, Marker.PasswordUpdateAfterReset.class})
  private String password;

  @JsonView({Marker.PasswordUpdate.class, Marker.PasswordUpdateAfterReset.class})
  @ApiModelProperty(value = "New Password", example = "password123", required = true, allowableValues = "range[8, 50]")
  @Size(min = 8, max = 50, message = "Password length must be in range 8..50 characters", groups = {Marker.PasswordUpdate.class, Marker.PasswordUpdateAfterReset.class})
  @NotNull(groups = {Marker.PasswordUpdate.class, Marker.PasswordUpdateAfterReset.class})
  private String freshPassword;

  @JsonView({Marker.Update.class})
  @ApiModelProperty(value = "BirthDate", required = true)
  @PastOrPresent(groups = {Marker.Update.class})
  //@NotNull(groups = {Marker.Update.class})
  private LocalDate birthDate;

  @JsonView({Marker.Update.class})
  @ApiModelProperty(value = "bio", required = true)
  //@NotNull(groups = {Marker.Update.class})
  private String bio;

  @JsonView({Marker.Update.class})
  @ApiModelProperty(value = "location", required = true)
  //@NotNull(groups = {Marker.Update.class})
  private String location;
}


