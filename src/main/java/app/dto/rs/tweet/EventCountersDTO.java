package app.dto.rs.tweet;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class EventCountersDTO {

  private Integer countReplies = 0;

  private Integer countQuoteTweets = 0;

  private Integer countRetweets = 0;

  private Integer countLikes = 0;

  private Integer countBookmarks = 0;

}
