package app.facade;

import app.dto.rq.MessageRequest;
import app.dto.rs.MessageResponse;
import app.exceptions.httpError.BadRequestException;
import app.model.Message;
import app.service.MessageService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class MessageFacade extends GeneralFacade<Message, MessageRequest, MessageResponse> {

  @Autowired
  private MessageService messageService;

  public Message addMessageToChat(Long userId, Message message) {
    if (message.getUser().getId().equals(userId))
      return this.messageService.addMessage(message);
    else throw new BadRequestException(String.format("Current user with id: %d is not the author of message ", userId));
  }
}
