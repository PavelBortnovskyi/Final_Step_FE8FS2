package app.dto.rq;

import app.annotations.Marker;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;

/**
 * UserDTO for login(Existed)/register(New) requests
 */
@Data
@ApiModel(description = "User model request")
public class UserModelRequest {

  @JsonView(Marker.forNew.class)
  @ApiModelProperty(value = "Full name", example = "John Doe", required = true, allowableValues = "range[2, 20]")
  @Size(max = 20, min = 2, message = "Full name length must be in range 2..20 characters", groups = {Marker.forExisted.class, Marker.forNew.class})
  @Null(groups = {Marker.forExisted.class})
  private String fullName;

  @JsonView(Marker.forNew.class)
  @ApiModelProperty(value = "User tag", example = "@john_doe", required = true, allowableValues = "range[2, 20]")
  @Size(max = 20, min = 2, message = "UserTag length must be in range 2..20 characters", groups = {Marker.forExisted.class, Marker.forNew.class})
  @Null(groups = {Marker.forExisted.class})
  private String userTag;


  @JsonView({Marker.forExisted.class, Marker.forNew.class})
  @ApiModelProperty(value = "Email", example = "john.doe@example.com", required = true, allowableValues = "range[6, 50]")
  @Size(min = 6, max = 50, message = "Max email length is 50 characters", groups = {Marker.forExisted.class, Marker.forNew.class})
  @Email(message = "Must have email format", groups = {Marker.forExisted.class, Marker.forNew.class})
  private String email;

  @JsonView({Marker.forExisted.class, Marker.forNew.class})
  @ApiModelProperty(value = "Password", example = "password123", required = true, allowableValues = "range[8, 50]")
  @Size(min = 8, max = 50, message = "Password length must be in range 8..50 characters", groups = {Marker.forExisted.class, Marker.forNew.class})
  private String password;
}


