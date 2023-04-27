package app.model;

import app.enums.TweetActionType;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;

@Entity
@Table(name = "tweet_actions")
@NoArgsConstructor
@Data
public class TweetAction extends BaseEntityModel{
    public TweetAction(TweetActionType actionType, Long tweetId, Long userId) {
        this.actionType = actionType;
        this.tweetId = tweetId;
        this.userId = userId;
        this.setCreatedBy(userId);
    }
    @Enumerated(EnumType.STRING)
    private TweetActionType actionType;

    @OneToOne(targetEntity = UserModel.class)
    @JoinColumn(name = "user_id")
    private Long userId;

    @OneToOne(targetEntity = Tweet.class)
    @JoinColumn(name = "tweet_id")
    private Long tweetId;
}
