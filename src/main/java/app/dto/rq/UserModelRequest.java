package app.dto.rq;

import app.annotations.Existed;
import app.annotations.New;
import app.annotations.Views;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;

/**
 * UserDTO for login(Existed)/register(New) requests
 */
@Data
@ApiModel(description = "User model request")
public class UserModelRequest {

  @JsonView(Views.Register.class)
  @ApiModelProperty(value = "Full name", example = "John Doe", required = true, allowableValues = "range[2, 20]")
  @Size(max = 20, min = 2, message = "Full name length must be in range 2..20 characters", groups = {Existed.class, New.class})
  @Null(groups = {Existed.class})
  @NotEmpty(message = "Full name cannot be empty!", groups = {New.class})
  private String fullName;

  @JsonView(Views.Register.class)
  @ApiModelProperty(value = "User tag", example = "@john_doe", required = true, allowableValues = "range[2, 20]")
  @Size(max = 20, min = 2, message = "UserTag length must be in range 2..20 characters", groups = {Existed.class, New.class})
  @Null(groups = {Existed.class})
  @NotEmpty(message = "UserTag cannot be empty!", groups = {New.class})
  private String userTag;


  @JsonView({Views.Register.class, Views.Login.class})
  @ApiModelProperty(value = "Email", example = "john.doe@example.com", required = true, allowableValues = "range[6, 50]")
  @Size(min = 6, max = 50, message = "Max email length is 50 characters", groups = {Existed.class, New.class})
  @Email(message = "Must have email format", groups = {Existed.class, New.class})
  @NotEmpty(groups = {New.class, Existed.class})
  private String email;

  @JsonView({Views.Register.class, Views.Login.class})
  @ApiModelProperty(value = "Password", example = "password123", required = true, allowableValues = "range[8, 50]")
  @Size(min = 8, max = 50, message = "Password length must be in range 8..50 characters", groups = {Existed.class, New.class})
  @NotEmpty(groups = {New.class, Existed.class})
  private String password;
}


