package app.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "rating_tweets")
@NoArgsConstructor
@Data
public class RatingModel {
  @Id
  @Column(name = "tweet_id")
  private Long id;
  @Column(name = "rating")
  private double tweetRating;

  @OneToOne
  @JoinColumn(name = "tweet_id")
  private Tweet tweet;

  public RatingModel(Long id, double rating) {
    this.id = id;
    this.tweetRating = rating;
  }
}
