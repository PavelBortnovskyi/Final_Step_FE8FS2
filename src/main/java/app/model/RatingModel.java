package app.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

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
