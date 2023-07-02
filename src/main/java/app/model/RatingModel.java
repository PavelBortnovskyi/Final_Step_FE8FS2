package app.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "rating_tweets")
@NoArgsConstructor
@Data
@SequenceGenerator(name = "custom_gen", sequenceName = "rating_tweets_id_seq", allocationSize = 1)
public class RatingModel extends BaseEntityModel{
  @Column(name = "tweet_id")
  private Long tweetID;
  @Column(name = "rating")
  private double tweetRating;

  @OneToOne(mappedBy = "ratingModel")
  @JoinColumn(name = "tweet_id")
  private Tweet tweet;

  public RatingModel(Long tweetID, double rating) {
    this.tweetRating = rating;
    this.tweetID = tweetID;
  }
}
