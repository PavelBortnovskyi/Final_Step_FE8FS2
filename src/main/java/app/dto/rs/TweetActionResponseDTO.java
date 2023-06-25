package app.dto.rs;

import app.enums.TweetActionType;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class TweetActionResponseDTO {

  Long id;

  String createdAt;

  TweetActionType tweetActionType;

  UserResponseMiniDTO user;

  TweetResponseDTO tweet;

}
