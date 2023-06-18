package app.dto.rs.tweet;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class EventsOfCurrentUserDTO {

  private boolean currUserLiked;

  private boolean currUserRetweeted;

  private boolean currUserCommented;

  private boolean currUserBookmarked;

}
