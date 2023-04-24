package app.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "chat")
@Data
public class ChatModel extends BaseEntityModel{
    @Column(name = "initiator_user_id")
    private Long initiator_user_id;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<MessageModel> messageModelList;

    @ManyToMany(mappedBy = "chats")
    private Set<ChatsToUsersModel> chatsToUser;

}
