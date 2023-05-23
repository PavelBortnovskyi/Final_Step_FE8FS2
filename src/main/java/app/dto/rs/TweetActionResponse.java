package app.dto.rs;

import app.enums.TweetActionType;
import lombok.Data;

@Data
public class TweetActionResponse {

    private TweetActionType actionType;
    private Long userId;
    private Long tweetId;
}
