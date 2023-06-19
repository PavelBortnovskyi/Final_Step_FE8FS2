package app.model;

import app.enums.TweetActionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.Objects;

//@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "tweet_actions")
@NoArgsConstructor
@AllArgsConstructor
@Data
@SequenceGenerator(name = "custom_gen", sequenceName = "tweet_actions_id_seq", allocationSize = 1)
public class TweetAction extends BaseEntityModel {

  @Enumerated(EnumType.STRING)
  private TweetActionType actionType;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private UserModel user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "tweet_id")
  private Tweet tweet;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    TweetAction tweetAction = (TweetAction) o;
    return getId().equals(tweetAction.getId());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId(), getCreatedAt());
  }
}
