package app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.*;


@Data
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "custom_gen", sequenceName = "users_id_seq", allocationSize = 1)
public class UserModel extends BaseEntityModel {
  @Column(name = "full_name", nullable = false)
  private String fullName;

  @Column(name = "user_tag", nullable = false, unique = true)
  private String userTag;

  @Column(name = "password") //nullable true for OAuth registration
  private String password;

  @Column(name = "email", nullable = false, updatable = false, unique = true)
  private String email;

  @Column(name = "date_of_birth")
  private LocalDate birthDate;

  @Column(name = "bio")
  private String bio;

  @Column(name = "location")
  private String location;

  @Column(name = "avatar_img_url")
  private String avatarImgUrl;

  @Column(name = "header_img_url")
  private String headerImgUrl;

  @Column(name = "is_verified", nullable = false)
  private boolean isVerified;

  @Column(name = "refresh_token")
  private String refreshToken;

  @Column(name = "token_used")
  private boolean refreshed = false;

  @LazyCollection(value = LazyCollectionOption.EXTRA)
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "followers", joinColumns = @JoinColumn(name = "follower_id"),
    inverseJoinColumns = @JoinColumn(name = "followed_id"))
  private Set<UserModel> followings = new HashSet<>();

  @LazyCollection(value = LazyCollectionOption.EXTRA)
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "followers", joinColumns = @JoinColumn(name = "followed_id"),
    inverseJoinColumns = @JoinColumn(name = "follower_id"))
  private Set<UserModel> followers = new HashSet<>();

  @LazyCollection(value = LazyCollectionOption.EXTRA)
  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
  private Set<Tweet> tweets = new HashSet<>();

  @LazyCollection(value = LazyCollectionOption.EXTRA)
  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
  private List<Message> messages = new ArrayList<>();

  @LazyCollection(value = LazyCollectionOption.EXTRA)
  @OneToMany(mappedBy = "initiatorUser", fetch = FetchType.LAZY)
  private Set<Chat> chat = new HashSet<>();

  @LazyCollection(value = LazyCollectionOption.EXTRA)
  @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private Set<Chat> chats = new HashSet<>();

  @LazyCollection(value = LazyCollectionOption.EXTRA)
  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
  private Set<TweetAction> tweetAction;

  @LazyCollection(value = LazyCollectionOption.EXTRA)
  @OneToMany(mappedBy = "initiatorUser", fetch = FetchType.LAZY)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<Notification> notifications_sent;

  @LazyCollection(value = LazyCollectionOption.EXTRA)
  @OneToMany(mappedBy = "receiverUser", fetch = FetchType.LAZY)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<Notification> notifications_received;

  public Integer getCountFollowers() {
    return followers.size();
  }

  public Integer getCountFollowings() {
    return followings.size();
  }

  public Integer getCountTweets() {
    return tweets.size();
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    UserModel userModel = (UserModel) o;
    return userTag.equals(userModel.userTag) && email.equals(userModel.email);
  }

  @Override
  public int hashCode() {
    return Objects.hash(userTag, email);
  }
}

