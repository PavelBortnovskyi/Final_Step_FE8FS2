package app.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "chat")
@Data
public class ChatModel extends BaseEntityModel{
    @Column(name = "initiator_user_id")
    private Long initiator_user_id;

}
