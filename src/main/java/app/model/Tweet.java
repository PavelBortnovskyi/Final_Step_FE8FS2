package app.model;

import app.enums.TweetType;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "tweets")
@NoArgsConstructor
@Data
@Accessors(chain = true)
@SequenceGenerator(name = "custom_gen", sequenceName = "tweets_id_seq", allocationSize = 1)
public class Tweet extends BaseEntityModel {
  @Column(name = "body") // , nullable = false)
  private String body;

  @Enumerated(EnumType.STRING)
  @Column(name = "tweet_type", nullable = false, updatable = false)
  private TweetType tweetType;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id")
  private UserModel user;

  @ManyToOne   //(cascade = CascadeType.REMOVE)
  @JoinColumn(name = "parent_tweet")
  private Tweet parentTweet;

  @OneToMany(mappedBy = "parentTweet", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
  private Set<Tweet> childTweet = new HashSet<>();

  @OneToMany(mappedBy = "tweet", cascade = CascadeType.REMOVE)
  private Set<TweetAction> tweetActions = new HashSet<>();

  @OneToMany(mappedBy = "tweet", cascade = CascadeType.REMOVE)
  private Set<Notification> notifications = new HashSet<>();

  @OneToMany(mappedBy = "tweet", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
  private Set<AttachmentImage> attachmentImages = new HashSet<>();

  @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
  @JoinColumn(name = "rating_model_id")
  private RatingModel ratingModel;


  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Tweet tweet = (Tweet) o;
    return getId().equals(tweet.getId());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId(), getBody());
  }
}
