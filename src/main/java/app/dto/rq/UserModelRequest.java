package app.dto.rq;

import app.annotations.Existed;
import app.annotations.New;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Data
public class UserModelRequest {

  @Null(groups = {Existed.class})
  @NotNull(groups = {New.class})
  private String fullName;

  @Null(groups = {Existed.class})
  @NotNull(groups = {New.class})
  private String userTag;

  @NotNull(groups = {New.class, Existed.class})
  private String email;

  @NotNull(groups = {New.class, Existed.class})
  private String password;
}
