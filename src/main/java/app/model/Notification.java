package app.model;

import app.enums.NotificationType;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;

@Entity
@Table(name = "notifications")
@NoArgsConstructor
@Data
public class Notification extends BaseEntityModel{
    public Notification(NotificationType notificationType, Long receiverId, Long initiatorId, Long tweetId) {
        this.notificationType = notificationType;
        this.receiverId = receiverId;
        this.initiatorId = initiatorId;
        this.tweetId = tweetId;
        this.isRead = false;
    }

    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    @Column(name = "receiver_id", nullable = false, updatable = false)
    private Long receiverId;

    @Column(name = "initiator_id", nullable = false, updatable = false)
    private Long initiatorId;

    @Column(name = "tweet_id", insertable = false, nullable = false, updatable = false)
    private Long tweetId;

    @Column(name = "is_read", nullable = false, updatable = true)
    private boolean isRead;

    @OneToOne(targetEntity = Tweet.class)
    private Long tweet;

}
