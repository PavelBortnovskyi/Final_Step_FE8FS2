package app.facade;

import app.dto.rq.MessageRequestDTO;
import app.dto.rs.MessageResponseDTO;
import app.exceptions.httpError.BadRequestException;
import app.model.Message;
import app.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MessageFacade extends GeneralFacade<Message, MessageRequestDTO, MessageResponseDTO> {
  private final MessageService messageService;

  public MessageResponseDTO addMessageToChat(Long userId, Message message) {
    if (message.getUser().getId().equals(userId))
      return this.convertToDto(messageService.addMessage(message));
    else throw new BadRequestException(String.format("Current user with id: %d is not the author of message ", userId));
  }

  public boolean changeMessage(Long userId, Message message) {
    return messageService.changeMessage(userId, message);
  }

  public boolean deleteMessage(Long userId, MessageRequestDTO message) {
    return messageService.deleteMessage(userId, message.getId());
  }
}
