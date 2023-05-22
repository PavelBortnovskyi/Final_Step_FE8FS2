package app.facade;

import app.dto.rq.MessageRequest;
import app.dto.rs.MessageResponse;
import app.model.Message;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MessageFacade extends GeneralFacade<Message, MessageRequest, MessageResponse> {
}
