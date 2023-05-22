package app.dto.rq;


import app.annotations.Marker;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Null;
import java.util.Set;

@Data
public class TweetRequest {
    @NotEmpty(groups = Marker.tweetUpdate.class)
    private Long id;
    private String body;
    private Set<String> attachmentsImages;
    @NotEmpty(groups = Marker.createRetweet.class)
    private Long parentTweetId;
    @Null
    private Long userId;
}
