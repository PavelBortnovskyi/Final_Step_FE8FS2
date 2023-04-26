package app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "chats")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Chat extends BaseEntityModel{
    @Column(name = "initiator_user_id", insertable = false, updatable = false)
    private Long initiatorUserId;
    @OneToMany(mappedBy = "chat")
    private List<Message> messages;

    // Foreign key for chats table to initiator_id column
    //  @OneToOne(targetEntity = TWuser.class)
    //  @JoinColumn(name = "initiator_user_id")
    //  private Long userId;

    @ManyToMany
    private Set<UserModel> users;

    public Chat(Long initiatorUserId) {
        this.initiatorUserId = initiatorUserId;
        this.setCreatedBy(initiatorUserId);
    }
}
