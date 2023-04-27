package app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.ManyToOne;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "chats")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Chat extends BaseEntityModel{
    public Chat(Long initiatorUserId) {
        this.initiatorUserId = initiatorUserId;
        this.setCreatedBy(initiatorUserId);
    }

    @Column(name = "initiator_user_id", insertable = false, updatable = false)
    private Long initiatorUserId;

    @ManyToOne(targetEntity = UserModel.class)
    private Long initiatorUser;
    @OneToMany(mappedBy = "chat")
    private List<Message> messages;

    @ManyToMany
    private Set<UserModel> users;
}
