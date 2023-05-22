package app.service;

import app.exceptions.chatError.ChatNotFoundException;
import app.exceptions.userError.UserNotFoundException;
import app.model.Chat;
import app.model.Message;
import app.model.UserModel;
import app.repository.ChatModelRepository;
import app.repository.MessageModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService extends GeneralService<Chat> {

  private final UserModelService userService;

  private final ChatModelRepository chatRepository;

  private final MessageModelRepository messageRepository;

  /**
   * Method returns created chat between 2 users
   */
  public Chat createChat(Long initiatorUserId, Long interlocutorUserId) throws UserNotFoundException {
    UserModel initiator = this.userService.findById(initiatorUserId).orElseThrow(() -> new UserNotFoundException(initiatorUserId));
    UserModel interlocutor = this.userService.findById(interlocutorUserId).orElseThrow(() -> new UserNotFoundException(interlocutorUserId));
    return this.chatRepository.save(new Chat(initiator, null, new HashSet<>() {{
      add(interlocutor);
      add(initiator);
    }}));
  }

  /**
   * Method returns boolean result of deleting operation
   */
  public boolean deleteChat(Long chatId, Long userId) {
    this.chatRepository.findById(chatId)
      .filter(chat -> chat.getInitiatorUser().getId().equals(userId))
      .map(chat -> {
        this.chatRepository.delete(chat);
        return chat;
      }).orElseThrow(() -> new ChatNotFoundException(String.format("Chat id: %d cannot be deleted by user with id: %d, it possible to remove only by chat initiator!", chatId, userId)));
    return this.chatRepository.existsById(chatId);
  }

  /**
   * Method returns chat after adding new user to it
   */

  public Chat addUser(Long userId, Long chatId) throws UserNotFoundException, ChatNotFoundException {
    return this.chatRepository
      .save(this.chatRepository
        .findById(chatId)
        .map(chat -> {
          chat.getUsers().add(this.userService.getUser(userId)
            .orElseThrow(() -> new UserNotFoundException(userId)));
          return chat;
        })
        .orElseThrow(() -> new ChatNotFoundException("Chat with id: " + chatId + " not found")));
  }

  /**
   * Method returns boolean result of user deleting from chat operation
   */
  public boolean removeUser(Long userToRemoveId, Long removeInitUserId, Long chatId) throws UserNotFoundException, ChatNotFoundException {
    Chat chat = this.chatRepository.findById(chatId).orElseThrow(() -> new ChatNotFoundException("Chat with id: " + chatId + " not found"));
    UserModel userToRemove = this.userService.findById(userToRemoveId).orElseThrow(() -> new UserNotFoundException(userToRemoveId));
    if (chat.getInitiatorUser().getId().equals(removeInitUserId) && chat.getUsers().contains(userToRemove)) {
      chat.getUsers().remove(this.userService.findById(userToRemoveId).get());
      this.chatRepository.save(chat);
      return true;
    } else return false;
  }

  /**
   * Method returns caht with added message
   */
  public Chat addMessage(Long chatId, Long userId, Message message) throws UserNotFoundException, ChatNotFoundException {
    return this.chatRepository.save(this.chatRepository.findById(chatId)
      .filter(chat -> chat.getUsers().contains(this.userService.findById(userId).orElseThrow(() -> new UserNotFoundException(userId))))
      .map(chat -> {
        chat.getMessages().add(message);
        return chat;
      }).orElseThrow(() -> new ChatNotFoundException(String.format("Chat id: %d for user with id: %d not found", chatId, userId))));
  }

  /**
   * Method returns pageable list of chat messages
   */
  public List<Message> getMessages(Long chatId, Integer pageSize, Integer pageNumber) {
    return this.messageRepository.getMessagesFromChat(chatId, Pageable.ofSize(pageSize).withPage(pageNumber)).toList();
  }

  /**
   * Method returns pageable chat list of user
   */
  public List<Chat> getChatList(Long userId, Integer pageSize, Integer pageNumber) {
    return this.chatRepository.getChatList(userId, Pageable.ofSize(pageSize).withPage(pageNumber)).toList();
  }

  /**
   * Method returns collection of user chats for only last message in each
   */
  public List<Chat> getUserChatsWithLastMessage(Long userId, Integer pageSize, Integer pageNumber) {
    Page<Object[]> result = chatRepository.getChatListForPreview(userId, Pageable.ofSize(pageSize).withPage(pageNumber));

    List<Chat> chats = new ArrayList<>();
    for (Object[] objects : result.getContent()) {
      Chat chat = (Chat) objects[0];
      Message lastMessage = (Message) objects[1];
      chat.setMessages(new ArrayList<>() {{
        add(lastMessage);
      }});
      chats.add(chat);
    }
    return chats;
  }
}
