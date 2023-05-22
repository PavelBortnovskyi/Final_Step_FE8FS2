package app.dto.rq;

import app.annotations.Marker;
import app.annotations.Views;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.validation.constraints.*;
import java.time.LocalDate;

/**
 * UserDTO for login(Existed)/register(New) requests
 */
@Data
@ApiModel(description = "User model request")
public class UserModelRequest {

  @JsonView({Views.Register.class, Views.Update.class})
  @ApiModelProperty(value = "Full name", example = "John Doe", required = true, allowableValues = "range[2, 20]")
  @Size(max = 20, min = 2, message = "Full name length must be in range 2..20 characters", groups = {Marker.forExisted.class, Marker.forNew.class})
  @Null(groups = {Marker.forExisted.class})
  private String fullName;

  @JsonView({Views.Register.class, Views.Update.class})
  @ApiModelProperty(value = "User tag", example = "@john_doe", required = true, allowableValues = "range[2, 20]")
  @Size(max = 20, min = 2, message = "UserTag length must be in range 2..20 characters", groups = {Marker.forExisted.class, Marker.forNew.class})
  @Null(groups = {Marker.forExisted.class})
  private String userTag;


  @JsonView({Views.Register.class, Views.Login.class})
  @ApiModelProperty(value = "Email", example = "john.doe@example.com", required = true, allowableValues = "range[6, 50]")
  @Size(min = 6, max = 50, message = "Max email length is 50 characters", groups = {Marker.forExisted.class, Marker.forNew.class})
  @Email(message = "Must have email format", groups = {Marker.forExisted.class, Marker.forNew.class})
  private String email;

  @JsonView({Views.Register.class, Views.Login.class})
  @ApiModelProperty(value = "Password", example = "password123", required = true, allowableValues = "range[8, 50]")
  @Size(min = 8, max = 50, message = "Password length must be in range 8..50 characters", groups = {Marker.forExisted.class, Marker.forNew.class})
  private String password;

  @JsonView({Views.Update.class})
  @ApiModelProperty(value = "BirthDate", required = true)
  @PastOrPresent
  @NotNull
  private LocalDate birthDate;

  @JsonView({Views.Update.class})
  @ApiModelProperty(value = "bio", required = true)
  @NotNull
  private String bio;

  @JsonView({Views.Update.class})
  @ApiModelProperty(value = "location", required = true)
  @NotNull
  private String location;

  @JsonView({Views.Update.class})
  @ApiModelProperty(value = "avatarImgMultipartFile", required = true)
  private MultipartFile avatarImgMultipartFile;

  @JsonView({Views.Update.class})
  @ApiModelProperty(value = "HeaderImgMultipartFile", required = true)
  private MultipartFile headerImgMultipartFile;
}


