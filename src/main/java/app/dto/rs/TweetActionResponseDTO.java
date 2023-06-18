package app.dto.rs;

import app.enums.TweetActionType;
import lombok.Data;

@Data
public class TweetActionResponseDTO {

  Long id;

  String createdAt;

  TweetActionType tweetActionType;

  UserResponseMiniDTO user;

  TweetResponseDTO tweet;

}
