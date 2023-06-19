package app.model;

import app.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "notifications")
@NoArgsConstructor
@AllArgsConstructor
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
