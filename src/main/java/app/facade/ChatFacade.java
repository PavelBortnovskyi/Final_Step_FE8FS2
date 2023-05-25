package app.facade;

import app.dto.rq.ChatRequest;
import app.dto.rs.ChatResponse;
import app.model.Chat;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class ChatFacade extends GeneralFacade<Chat, ChatRequest, ChatResponse> {
}
