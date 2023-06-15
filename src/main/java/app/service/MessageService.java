package app.service;

import app.exceptions.chatError.ChatNotFoundException;
import app.exceptions.messageError.MessageException;
import app.exceptions.messageError.MessageNotFoundException;
import app.exceptions.userError.UserNotFoundException;
import app.model.Message;
import app.repository.MessageModelRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MessageService extends GeneralService<Message> {

  private final MessageModelRepository messageRepository;

  private final ChatService chatService;

  private final UserService userService;

  /**
   * Method returns message after it added to chat
   */
  public Message addMessage(Message message) throws UserNotFoundException, ChatNotFoundException {
    if (this.chatService.findById(message.getChat().getId())
      .filter(chat -> chat.getUsers().contains(this.userService.getUser(message.getUser().getId()))
        || chat.getInitiatorUser().getId().equals(message.getUser().getId())
      ).isPresent())
      return this.messageRepository.save(message);
    else
      throw new ChatNotFoundException(String.format("Chat with id: %d for user with id: %d not found", message.getChat().getId(), message.getUser().getId()));
  }

  /**
   * Method for change message body (checks userId as author of message)
   */
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

  /**
   * Method for delete message (checks userId as author of message)
   */
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
