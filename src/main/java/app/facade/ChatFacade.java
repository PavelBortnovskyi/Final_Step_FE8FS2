package app.facade;

import app.dto.rq.ChatRequestDTO;
import app.dto.rs.ChatResponseDTO;
import app.dto.rs.MessageResponseDTO;
import app.exceptions.chatError.ChatNotFoundException;
import app.exceptions.httpError.BadRequestException;
import app.exceptions.userError.UserNotFoundException;
import app.model.BaseEntityModel;
import app.model.Chat;
import app.model.UserModel;
import app.service.ChatService;
import app.service.UserService;
import app.utils.CustomPageImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ChatFacade extends GeneralFacade<Chat, ChatRequestDTO, ChatResponseDTO> {

  private final ChatService chatService;

  private final UserService userService;

  /**
   * Method creates new chat between 2 users
   */
  public Set<ChatResponseDTO> createChat(Long userId, Long interlocutorId) {
    if (userId.equals(interlocutorId))
      throw new BadRequestException("Please find somebody else to chat except yourself!");
    return this.chatService.createChat(userId, interlocutorId).stream().map(this::convertToDto).collect(Collectors.toSet());
  }

  /**
   * Method deletes chat (can be performed only by chat initiator!)
   */
  public boolean deleteChat(Long chatId, Long userId) {
    return this.chatService.deleteChat(chatId, userId);
  }

  /**
   * Method for add new user to chat
   */
  public ChatResponseDTO addUserToChat(Long userId, Long chatId) {
    return this.convertToDto(this.chatService.addUserToChat(userId, chatId));
  }

  /**
   * Method removes user from chat
   */
  public ResponseEntity<String> removeUserFromChat(Long userToRemoveId, Long removeInitUserId, Long chatId) {
    return this.chatService.removeUserFromChat(userToRemoveId, removeInitUserId, chatId);
  }

  public Set<Long> getChatMemberIds(Long chatId){
    Chat chat = chatService.findById(chatId).orElseThrow(() -> new ChatNotFoundException(String.format("Chat with id: %d not found", chatId)));
    Set<Long> chatIds = this.chatService.getOne(chatId).getUsers().stream().map(UserModel::getId).collect(Collectors.toSet());
    chatIds.add(chat.getInitiatorUser().getId());
    return chatIds;
  }

  /**
   * Method returns page of user chat responses with last message to preview
   */
  public CustomPageImpl<ChatResponseDTO> getChatsForPreview(Long userId, Integer pageSize, Integer pageNumber) {
    return this.chatService.getUserChatsWithLastMessage(userId, pageSize, pageNumber);
  }

  /**
   * Method returns page of user message responses from chat
   */
  public Page<MessageResponseDTO> getChatMessages(Long userId, Long chatId, Integer pageSize, Integer pageNumber) {
    this.chatService.findById(chatId)
      .filter(chat -> chat.getUsers().contains(this.userService.findById(userId)
        .orElseThrow(() -> new UserNotFoundException(userId))) || chat.getInitiatorUser().getId().equals(userId))
      .orElseThrow(() -> new ChatNotFoundException(String.format("Chat id: %d for user with id: %d not found", chatId, userId)));
    return this.chatService.getMessages(chatId, pageSize, pageNumber);
  }

  /**
   * Method returns page of message responses from user chat according to keyword matches
   */
  public Page<MessageResponseDTO> searchMessagesInChat(Long chatId, Long userId, Integer pageSize, Integer pageNumber, String keyword) {
    return this.chatService.searchMessagesInChat(chatId, userId, pageSize, pageNumber, keyword);
  }

  /**
   * Method returns page of message responses from user chats according to keyword matches
   */
  public Page<MessageResponseDTO> searchMessagesInChats(Long userId, Integer pageSize, Integer pageNumber, String keyword) {
    return this.chatService.searchMessagesInChats(userId, pageSize, pageNumber, keyword);
  }
}
