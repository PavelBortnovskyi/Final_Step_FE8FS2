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
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import java.util.Set;

@Entity
@Table(name = "tweets")
@NoArgsConstructor
@Data
public class Tweet extends BaseEntityModel{
    public Tweet(String body, Long userId) {
        this.body = body;
        this.tweetType = TweetType.TWEET;
        this.userId = userId;
        this.setCreatedBy(userId);
    }

    public Tweet(String body, TweetType tweetType, Long userId, Long parentTweetId) {
        this.body = body;
        this.tweetType = tweetType;
        this.userId = userId;
        this.setCreatedBy(userId);
        this.parentTweetId = parentTweetId;
    }

    @Column(name = "body", nullable = false, updatable = true)
    private String body;

    @Enumerated(EnumType.STRING)
    private TweetType tweetType;

    @Column(name = "user_id", insertable = false, updatable = false)
    private Long userId;

    @Column(name = "parent_tweet_id", nullable = true, updatable = true)
    private Long parentTweetId;

    @OneToOne(mappedBy = "tweet")
    private TweetAction tweetAction;

    @OneToOne(mappedBy = "tweet")
    private Notification notification;

    @ManyToOne(targetEntity = UserModel.class)
    @JoinColumn(name = "user_id")
    private UserModel user;

    @OneToMany(mappedBy = "tweet")
    private Set<AttachmentImage> attachmentImages;
}
