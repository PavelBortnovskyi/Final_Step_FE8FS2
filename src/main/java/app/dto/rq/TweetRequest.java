package app.dto.rq;


import app.annotations.Marker;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.util.Set;

@Data
public class TweetRequest {
    @NotEmpty(groups = Marker.forExisted.class)
    @JsonView(Marker.forExisted.class)
    private Long id;

    @JsonView({Marker.forNew.class, Marker.createRetweet.class})
    private String body;

    @JsonView({Marker.forNew.class, Marker.createRetweet.class})
    private Set<String> attachmentsImages;

    @NotEmpty(groups = {Marker.createRetweet.class, Marker.createReply.class})
    @JsonView(Marker.createRetweet.class)
    private Long parentTweetId;

    @NotEmpty
    private Long userId;
}
