package app.dto.rq;


import app.enums.TweetType;
import app.model.Tweet;
import lombok.Data;

import java.util.Set;

@Data
public class TweetRequest {
  private Long id;
  private String body;
  private Set<String> attachmentsImages;
  private Long userId;
  private Long parentTweetId;
}
