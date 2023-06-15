package app.dto.rs;

import app.enums.TweetType;
import app.model.AttachmentImage;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.HashSet;
import java.util.Set;

@Data
@Accessors(chain = true)
@ApiModel(description = "Tweet response")
public class TweetResponseDTO {

  private Long id;

  private String createdAt;

  private String body;

  private TweetType tweetType;

  private UserResponseDTO user;

  private TweetResponseDTO parentTweet;

  private Set<AttachmentImage> attachmentImages = new HashSet<>();

  private Integer countReplays = 0;

  private Integer countQuoteTweets = 0;

  private Integer countLikes = 0;

  private Integer countBookmarks = 0;

  private Integer countRetweets = 0;

}
