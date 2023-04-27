package app.model;

import app.enums.NotificationType;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    @Column(name = "notification_type", nullable = false, updatable = false)
    private NotificationType notificationType;
    @OneToOne(targetEntity = UserModel.class)
    @JoinColumn(name = "receiver_id")
    private Long receiverId;
    @OneToOne(targetEntity = UserModel.class)
    @JoinColumn(name = "initiator_id")
    private Long initiatorId;
    @OneToOne(targetEntity = Tweet.class)
    @JoinColumn(name = "tweet_id", insertable = false, updatable = false)
    private Long tweetId;
    @Column(name = "is_read", nullable = false, updatable = true)
    private boolean isRead;

}
