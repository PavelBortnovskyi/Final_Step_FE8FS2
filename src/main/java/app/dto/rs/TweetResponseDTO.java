package app.dto.rs;

import app.enums.TweetType;
import app.model.AttachmentImage;
import app.model.UserModel;
import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@ApiModel(description = "Tweet response")
public class TweetResponseDTO {

  private Long id;

  private String createdAt;

  private String body;

  private TweetType tweetType;

  private UserResponseDTO user;

  private TweetResponseDTO parentTweet;

  private Set<AttachmentImage> attachmentImages = new HashSet<>();

  private Integer countReplays;

  private Integer countQuoteTweets;

  private Integer countLikes;

  private Integer countBookmarks;

  private Integer countRetweets;

}
