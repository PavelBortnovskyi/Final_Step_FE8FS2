package app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "messages")
@NoArgsConstructor
@AllArgsConstructor
@Data
@SequenceGenerator(name = "custom_gen", sequenceName = "messages_id_seq", allocationSize = 1)
public class Message extends BaseEntityModel {
  @ManyToOne
  @JoinColumn(name = "chat_id")
  private Chat chat;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private UserModel user;

  @Column(name = "body")
  private String body;

  @Column(name = "sent_at")
  private Timestamp sent;
}
