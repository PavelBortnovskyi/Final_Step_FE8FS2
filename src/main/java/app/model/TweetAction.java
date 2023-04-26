package app.model;

import app.enums.TweetActionType;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tweet_actions")
@NoArgsConstructor
@Data
public class TweetAction extends BaseEntityModel{
    @Column(name = "action_type", nullable = false, updatable = true)
    private String actionType;
    @OneToOne(targetEntity = UserModel.class)
    private Long user;
    @OneToOne(targetEntity = Tweet.class)
    private Long tweet;

    public TweetAction(TweetActionType actionType, Long tweetId, Long userId) {
        this.actionType = actionType.toString();
        this.tweet = tweetId;
        this.user = userId;
        this.setCreatedBy(userId);
    }
}
