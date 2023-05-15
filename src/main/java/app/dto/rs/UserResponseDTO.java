package app.dto.rs;

import app.model.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserResponseDTO {

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

  private TweetAction tweetAction;

  private Integer countUserFollowers;

  private Integer countUserFollowings;
}
