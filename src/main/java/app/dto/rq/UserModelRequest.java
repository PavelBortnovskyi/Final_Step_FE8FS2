package app.dto.rq;

import app.annotations.Existed;
import app.annotations.New;
import lombok.Data;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;

/**
 * UserDTO for login(Existed)/register(New) requests
 */
@Data
public class UserModelRequest {

  @Size(max = 20, min = 2, message = "Username length must be in range 2..20 characters", groups = {Existed.class, New.class})
  @Null(groups = {Existed.class})
  @NotEmpty(groups = {New.class}, message = "Username cannot be empty!")
  private String fullName;

  @Size(max = 20, min = 2, message = "UserTag length must be in range 2..20 characters", groups = {Existed.class, New.class})
  @Null(groups = {Existed.class})
  @NotEmpty(groups = {New.class}, message = "UserTag cannot be empty!")
  private String userTag;

  @Size(max = 50, message = "Max email length is 50 characters", groups = {Existed.class, New.class})
  @Email(groups = {Existed.class, New.class}, message = "Must have email format")
  @NotEmpty(groups = {New.class, Existed.class})
  private String email;

  @Size(max = 50, min = 8, message = "Password length must be in range 8..50 characters", groups = {Existed.class, New.class})
  @NotEmpty(groups = {New.class, Existed.class})
  private String password;
}
