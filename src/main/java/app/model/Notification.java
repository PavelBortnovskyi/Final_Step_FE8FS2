package app.model;

import app.enums.NotificationType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "notifications")
@NoArgsConstructor
@Data
@SequenceGenerator(name = "custom_gen", sequenceName = "notifications_id_seq", allocationSize = 1)
public class Notification extends BaseEntityModel {

  @Enumerated(EnumType.STRING)
  @Column(name = "notification_type", nullable = false, updatable = false)
  private NotificationType notificationType;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "receiver_id")
  private UserModel receiverUser;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "initiator_id")
  private UserModel initiatorUser;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "tweet_id", updatable = false)
  private Tweet tweet;

  @Column(name = "is_read", nullable = false, updatable = true)
  private boolean isRead;
}
