package app.model;

import app.enums.TweetType;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "tweets")
@NoArgsConstructor
@Data
public class Tweet extends BaseEntityModel{
    @Column(name = "body", nullable = false, updatable = true)
    private String body;
    @Column(name = "tweet_type", nullable = false, updatable = false)
    private String tweetType;
    @Column(name = "user_id", insertable = false, updatable = false)
    private Long userId;
    @Column(name = "parent_tweet_id", nullable = true, updatable = true)
    private Long parentTweetId;

    @OneToOne(mappedBy = "tweet")
    private TweetAction tweetAction;

    @OneToOne(mappedBy = "tweet")
    private Notification notification;

    public Tweet(String body, Long userId) {
        this.body = body;
        this.tweetType = TweetType.TWEET.toString();
        this.userId = userId;
        this.setCreatedBy(userId);
    }

    public Tweet(String body, TweetType tweetType, Long userId, Long parentTweetId) {
        this.body = body;
        this.tweetType = tweetType.toString();
        this.userId = userId;
        this.setCreatedBy(userId);
        this.parentTweetId = parentTweetId;
    }

    @ManyToOne(targetEntity = UserModel.class)
    @JoinColumn(name = "user_id")
    private Set<UserModel> users;

    @OneToMany(mappedBy = "tweet")
    private Set<AttachmentImage> attachmentImages;
}
