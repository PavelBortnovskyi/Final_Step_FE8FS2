package app.dto.rs;

import app.enums.TweetType;
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

  private TweetType tweetType;

  private UserResponseMiniDTO user;

  private TweetResponseMiniDTO parentTweet;

  private String body;

  private Set<AttachmentImageResponse> attachmentImages = new HashSet<>();

  private Integer countReplays = 0;

  private Integer countQuoteTweets = 0;

  private Integer countRetweets = 0;

  private Integer countLikes = 0;

  private Integer countBookmarks = 0;

}
