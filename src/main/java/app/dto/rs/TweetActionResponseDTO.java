package app.dto.rs;

import app.enums.TweetActionType;
import app.model.Tweet;
import app.model.TweetAction;
import lombok.Data;

@Data
public class TweetActionResponseDTO {

  TweetActionType tweetActionType;

  String createdAt;

  UserResponseMiniDTO user;

  TweetResponseDTO tweet;

}