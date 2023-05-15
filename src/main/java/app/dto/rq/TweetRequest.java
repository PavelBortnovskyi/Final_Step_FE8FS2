package app.dto.rq;


import app.model.Tweet;
import lombok.Data;
import java.util.Set;

@Data
public class TweetRequest {
    private Long tweetId;
    private String body;
    private Set<String> attachmentsImages;
    private Tweet parentTweet;
    private Long userId;
}
