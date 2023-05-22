package app.dto.rq;


import app.annotations.Marker;
import app.enums.TweetType;
import app.model.Tweet;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
public class TweetRequest {
    @JsonView(Marker.TweetDetails.class)
    private Long id;
    @NotEmpty
    @JsonView(Marker.TweetDetails.class)
    private String body;
    @JsonView(Marker.TweetDetails.class)
    private Set<String> attachmentsImages;
    @JsonView(Marker.TweetDetails.class)
    private Long parentTweetId;
    @NotNull
    @JsonView(Marker.TweetDetails.class)
    private Long userId;
    @NotNull
    @JsonView(Marker.TweetDetails.class)
    private TweetType tweetType;
}
