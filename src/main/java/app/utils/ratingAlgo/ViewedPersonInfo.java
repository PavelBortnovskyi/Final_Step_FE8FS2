package app.utils.ratingAlgo;

import app.model.BaseEntityModel;
import app.model.Tweet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "viewed_person_info",
  uniqueConstraints = {
    @UniqueConstraint(columnNames = {"tweet_id", "user_id"}),
    @UniqueConstraint(columnNames = {"tweet_id", "person_ip"})
  })
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SequenceGenerator(name = "custom_gen", sequenceName = "viewed_person_info_id_seq", allocationSize = 1)
public class ViewedPersonInfo extends BaseEntityModel {
  @ManyToOne
  @JoinColumn(name = "tweet_id")
  private Tweet tweet;

  @Column(name = "user_id")
  private Long userId;

  @Column(name = "person_ip")
  private String personIp;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Tweet tweet = (Tweet) o;
    return getId().equals(tweet.getId());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId(), getTweet());
  }
}
