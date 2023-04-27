package app.model;

import app.enums.TweetActionType;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;

@Entity
@Table(name = "tweet_actions")
@NoArgsConstructor
@Data
public class TweetAction extends BaseEntityModel{
    public TweetAction(TweetActionType actionType, Long tweetId, Long userId) {
        this.actionType = actionType;
        this.tweet = tweetId;
        this.user = userId;
        this.setCreatedBy(userId);
    }
    @Enumerated(EnumType.STRING)
    private TweetActionType actionType;

    @OneToOne(targetEntity = UserModel.class)
    private Long user;

    @OneToOne(targetEntity = Tweet.class)
    private Long tweet;
}
