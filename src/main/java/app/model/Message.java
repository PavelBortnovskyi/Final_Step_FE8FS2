package app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "messages")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Message extends BaseEntityModel{
    @ManyToOne(targetEntity = Chat.class)
    @JoinColumn(name = "chat_id")
    private Long chatId;
    @ManyToOne(targetEntity = UserModel.class)
    @JoinColumn(name = "user_id")
    private Long userId;
    @Column(name = "body")
    private String body;
    @Column(name = "sent_at")
    private LocalDateTime sent;

    public Message(String body, Long userId) {
        this.body = body;
        this.userId = userId;
        this.setCreatedBy(userId);
        this.sent = LocalDateTime.now();
    }
}
