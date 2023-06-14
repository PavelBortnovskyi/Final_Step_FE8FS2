package app.dto.rs;

import app.enums.TweetType;
import app.model.UserModel;
import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.util.HashSet;

@Data
@ApiModel(description = "Tweet response")
public class TweetResponseDTO {

  private Long id;

  private String createdAt;

  private String body;

  private TweetType tweetType;

  private UserResponseDTO user;

  private TweetResponseDTO parentTweet;

  private HashSet<String> attachmentImages;

  private Integer countReplays;

  private Integer countQuoteTweets;

  private Integer countLikes;

  private Integer countBookmarks;

  private Integer countRetweets;

}
