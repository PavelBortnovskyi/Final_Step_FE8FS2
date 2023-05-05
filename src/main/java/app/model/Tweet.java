package app.model;

import app.enums.TweetType;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import java.util.Set;

@Entity
@Table(name = "tweets")
@NoArgsConstructor
@Data
public class Tweet extends BaseEntityModel {
  @Column(name = "body", nullable = false, updatable = true)
  private String body;
  @Enumerated(EnumType.STRING)
  @Column(name = "tweet_type", nullable = false, updatable = false)
  private TweetType tweetType;
  @ManyToOne(targetEntity = UserModel.class)
  @JoinColumn(name = "user_id")
  private Long userId;
  @OneToOne(targetEntity = Tweet.class)
  @JoinColumn(name = "parent_tweet_id")
  private Long parentTweetId;

  @OneToOne(mappedBy = "tweetId")
  private TweetAction tweetAction;

  @OneToOne(mappedBy = "tweetId")
  private Notification notification;

  public Tweet(String body, Long userId) {
    this.body = body;
    this.tweetType = TweetType.TWEET;
    this.userId = userId;
    this.setCreatedBy(userId);
  }

  public Tweet(String body, TweetType tweetType, Long userId, Long parentTweetId) {
    this.body = body;
    this.tweetType = tweetType;
    this.userId = userId;
    this.setCreatedBy(userId);
    this.parentTweetId = parentTweetId;
  }

  @OneToMany(mappedBy = "tweetId")
  private Set<AttachmentImage> attachmentImages;
}
