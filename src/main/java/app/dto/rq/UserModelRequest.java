package app.dto.rq;

import app.annotations.Existed;
import app.annotations.New;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;

@Data
public class UserModelRequest {

  @Size(max = 20, min = 1)
  @Null(groups = {Existed.class})
  @NotNull(groups = {New.class})
  private String fullName;

  @Size(max = 20, min = 1)
  @Null(groups = {Existed.class})
  @NotNull(groups = {New.class})
  private String userTag;

  @Size(max = 50)
  @Email
  @NotNull(groups = {New.class, Existed.class})
  private String email;

  @Size(max = 50, min = 8)
  @NotNull(groups = {New.class, Existed.class})
  private String password;
}
