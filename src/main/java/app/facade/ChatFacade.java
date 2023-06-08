package app.facade;

import app.dto.rq.ChatRequest;
import app.dto.rs.ChatResponse;
import app.dto.rs.MessageResponse;
import app.exceptions.chatError.ChatNotFoundException;
import app.exceptions.httpError.BadRequestException;
import app.exceptions.userError.UserNotFoundException;
import app.model.Chat;
import app.model.Message;
import app.service.ChatService;
import app.service.UserService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class ChatFacade extends GeneralFacade<Chat, ChatRequest, ChatResponse> {

  @Autowired
  private ChatService chatService;

  @Autowired
  private UserService userService;

  /**
   * Method creates new chat between 2 users
   */
  public ChatResponse createChat(Long userId, Long interlocutorId) {
    if (userId.equals(interlocutorId))
      throw new BadRequestException("Please find somebody else to chat except yourself!");
    return this.convertToDto(this.chatService.getChatByUsersIdPair(userId, interlocutorId).orElseGet(() -> this.chatService.createChat(userId, interlocutorId)));
  }

  /**
   * Method deletes chat (can be performed only by chat initiator!)
   */
  public boolean deleteChat(Long userId, Long chatId) {
    return this.chatService.deleteChat(chatId, userId);
  }

  public Message addMessageToChat(Long chatId, Long userId, Message message) {
    return this.chatService.addMessage(chatId, userId, message);
  }

  /**
   * Method for add new user to chat
   */
  public ChatResponse addUserToChat(Long userId, Long chatId) {
    return this.convertToDto(this.chatService.addUserToChat(userId, chatId));
  }

  /**
   * Method removes user from chat (can be performed only by chat initiator!)
   */
  public boolean removeUserFromChat(Long userToRemoveId, Long removeInitUserId, Long chatId) {
    return this.chatService.removeUser(userToRemoveId, removeInitUserId, chatId);
  }

  /**
   * Method returns page of user chat responses with last message to preview
   */
  public Page<ChatResponse> getChatsForPreview(Long userId, Integer pageSize, Integer pageNumber) {
    return this.chatService.getUserChatsWithLastMessage(userId, pageSize, pageNumber);
  }

  /**
   * Method returns page of user message responses from chat
   */
  public Page<MessageResponse> getChatMessages(Long userId, Long chatId, Integer pageSize, Integer pageNumber) {
    this.chatService.findById(chatId)
      .filter(chat -> chat.getUsers().contains(this.userService.findById(userId)
        .orElseThrow(() -> new UserNotFoundException(userId))))
      .orElseThrow(() -> new ChatNotFoundException(String.format("Chat id: %d for user with id: %d not found", chatId, userId)));
    return this.chatService.getMessages(chatId, pageSize, pageNumber);
  }

  /**
   * Method returns page of message responses from user chat according to keyword matches
   */
  public Page<MessageResponse> searchMessagesInChat(Long chatId, Long userId, Integer pageSize, Integer pageNumber, String keyword) {
    return this.chatService.searchMessagesInChat(chatId, userId, pageSize, pageNumber, keyword);
  }

  /**
   * Method returns page of message responses from user chats according to keyword matches
   */
  public Page<MessageResponse> searchMessagesInChats(Long userId, Integer pageSize, Integer pageNumber, String keyword) {
    return this.chatService.searchMessagesInChats(userId, pageSize, pageNumber, keyword);
  }
}
