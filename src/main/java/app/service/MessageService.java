package app.service;

import app.exceptions.messageError.MessageException;
import app.exceptions.messageError.MessageNotFoundException;
import app.model.Message;
import app.repository.MessageModelRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MessageService extends GeneralService<Message> {

  private final MessageModelRepository messageRepository;

  public void changeMessage(Long userId, Message message) throws MessageNotFoundException, MessageException {
    if (userId.equals(message.getUser().getId())) {
      this.messageRepository.findById(message.getId())
        .map(m -> {
          this.messageRepository.changeMessage(message.getId(), message.getBody());
          return m;
        })
        .orElseThrow(() -> new MessageNotFoundException(String.format("Message with id: %d not found", message.getId())));
    } else
      throw new MessageException(String.format("User with id: %d is not the author of message with id: %d", userId, message.getId()));
  }

  public boolean deleteMessage(Long userId, Long messageId) throws MessageNotFoundException, MessageException {
    if (this.messageRepository.findById(messageId)
      .orElseThrow(() -> new MessageNotFoundException(String.format("Message with id: %d not found", messageId)))
      .getUser().getId().equals(userId)) {
      this.messageRepository.deleteById(messageId);
      return true;
    } else
      throw new MessageException(String.format("User with id: %d is not the author of message with id: %d", userId, messageId));
  }
}
