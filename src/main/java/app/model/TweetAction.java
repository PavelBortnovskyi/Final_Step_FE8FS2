package app.model;

import app.enums.TweetActionType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "tweet_actions")
@NoArgsConstructor
@Data
public class TweetAction extends BaseEntityModel {
  @Enumerated(EnumType.STRING)
  private TweetActionType actionType;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private UserModel user;

  @ManyToOne
  @JoinColumn(name = "tweet_id")
  private Tweet tweet;
}
