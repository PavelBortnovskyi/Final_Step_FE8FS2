package app.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "notification")
@Data
public class NotificationModel extends BaseEntityModel{
    public NotificationModel() {
    }
    @Column(name = "notification_type")
    private NotificationTypeEnum notificationType;
    @Column(name = "receiver_id")
    private Long receiver_id;
    @Column(name = "initiator_id")
    private Long initiator_id;
    @Column(name = "tweet_id")
    private Long tweet_id;
    @Column(name = "is_read")
    private boolean is_read;


}
