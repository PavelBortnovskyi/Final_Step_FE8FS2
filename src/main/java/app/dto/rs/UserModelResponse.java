package app.dto.rs;

import app.model.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class UserModelResponse {

  private String fullName;
  private String userTag;
  private String email;
  private LocalDate birthdate;
  private String bio;
  private String location;
  private String avatarImgUrl;
  private String headerImgUrl;
  private boolean isVerified;
  private Set<UserModel> following;
  private Set<UserModel> followers;
  private Set<Tweet> tweets;
  private Set<Message> messages;
  private Set<Chat> chat;
  private Set<Chat> chats;
  private TweetAction tweetAction;


  private Integer countUserFollowers;
  private Integer countUserFollowings;
}
