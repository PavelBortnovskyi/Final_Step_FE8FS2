package app.model;

import app.model.BaseEntityModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name = "rating_tweets")
@NoArgsConstructor
@Data
@SequenceGenerator(name = "custom_gen", sequenceName = "tweets_id_seq", allocationSize = 1)
public class RatingModel {
  @Id
  @Column(name = "tweet_id")
  private Long tweetID;
  @Column(name = "rating")
  private double tweetRating;

  public RatingModel(Long id, double rating) {
    this.tweetID = id;
    this.tweetRating = rating;
  }
}
