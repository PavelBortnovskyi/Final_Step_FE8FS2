package app.dto.rs;

import app.model.Message;
import app.model.UserModel;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class ChatResponse {

    private Long initiatorUser;
    private List<Message> messages;
    private Set<UserModel> users;
}
