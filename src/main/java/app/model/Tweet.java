package app.model;

import app.enums.TweetType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "tweets")
@NoArgsConstructor
@Data
public class Tweet extends BaseEntityModel {
  @Column(name = "body", nullable = false)
  private String body;

  @Enumerated(EnumType.STRING)
  @Column(name = "tweet_type", nullable = false, updatable = false)
  private TweetType tweetType;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private UserModel user;

  @ManyToOne
  @JoinColumn(name = "parent_tweet")
  private Tweet parentTweet;

  @OneToMany(mappedBy = "tweet")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<TweetAction> tweetActions = new HashSet<>();

  @OneToMany(mappedBy = "tweet")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<Notification> notifications = new HashSet<>();

  @OneToMany(mappedBy = "tweet")
  private Set<AttachmentImage> attachmentImages = new HashSet<>();

  @Column(name = "count_likes")
  private Integer countLikes;

  @Column(name = "count_retweets")
  private Integer countRetweets;

  @Column(name = "count_reply")
  private Integer countReply;


}
