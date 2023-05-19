package app.dto.rs;

import lombok.Data;

import java.time.LocalDate;


/**
 * UserDTO for responses
 */
@Data
public class UserModelResponse {

  private Long id;

  private String fullName;

  private String userTag;

  private String email;

  private LocalDate birthdate;

  private String bio;

  private String location;

  private String avatarImgUrl;

  private String headerImgUrl;

  private boolean isVerified;

  private Integer countUserFollowers;

  private Integer countUserFollowings;
}
