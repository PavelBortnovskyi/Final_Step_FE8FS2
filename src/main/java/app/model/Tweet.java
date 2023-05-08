package app.model;

import app.enums.TweetType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
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
  @JoinColumn(name = "parent_tweet_id")
  private Tweet parentTweetId;

  @OneToMany(mappedBy = "tweet")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<TweetAction> tweetActions = new HashSet<>();

  @OneToMany(mappedBy = "tweet")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<Notification> notifications = new HashSet<>();

  @OneToMany(mappedBy = "tweet")
  private Set<AttachmentImage> attachmentImages = new HashSet<>();
}
