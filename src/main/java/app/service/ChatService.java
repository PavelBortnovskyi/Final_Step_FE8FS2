package app.service;

import app.dto.rs.ChatResponseDTO;
import app.dto.rs.MessageResponseDTO;
import app.exceptions.chatError.ChatNotFoundException;
import app.exceptions.httpError.BadRequestException;
import app.exceptions.userError.UserNotFoundException;
import app.model.Chat;
import app.model.Message;
import app.model.UserModel;
import app.repository.ChatModelRepository;
import app.repository.MessageModelRepository;
import app.utils.CustomPageImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class ChatService extends GeneralService<Chat> {

  private final UserService userService;

  private final ChatModelRepository chatRepository;

  private final MessageModelRepository messageRepository;

  private final ModelMapper modelMapper;

  /**
   * Method returns created chat between 2 users
   */
  public Set<Chat> createChat(Long initiatorUserId, Long interlocutorUserId) throws UserNotFoundException {
    UserModel initiator = userService.findById(initiatorUserId).orElseThrow(() -> new UserNotFoundException(initiatorUserId));
    UserModel interlocutor = userService.findById(interlocutorUserId).orElseThrow(() -> new UserNotFoundException(interlocutorUserId));

    Set<Chat> chats = chatRepository.getChatByUsersIds(initiatorUserId, interlocutorUserId)
      .orElse(new HashSet<>());

    if (chats.isEmpty() || chats.stream().filter(chat -> chat.getUsers().size() < 2).findFirst().isEmpty()) {
      Chat newChat = chatRepository.save(new Chat(initiator, new ArrayList<>(), new HashSet<>() {{
        add(interlocutor);
      }}));
      chats.add(newChat);
    }

    return chats;
  }

  public Optional<Set<Chat>> getChatByUsersIdPair(Long userId, Long interlocutorId) {
    return chatRepository.getChatByUsersIds(userId, interlocutorId);
  }

  /**
   * Method returns boolean result of deleting operation
   */
  public boolean deleteChat(Long chatId, Long userId) {
    chatRepository.findById(chatId)
      .filter(chat -> chat.getInitiatorUser().getId().equals(userId))
      .map(chat -> {
        chatRepository.delete(chat);
        return chat;
      }).orElseThrow(() -> new BadRequestException(String.format("Chat id: %d cannot be deleted by user with id: %d, it possible to remove only by chat initiator!", chatId, userId)));
    return chatRepository.existsById(chatId);
  }

  /**
   * Method returns chat after adding new user to it
   */

  public Chat addUserToChat(Long userId, Long chatId) throws UserNotFoundException, ChatNotFoundException {
    return chatRepository.save(chatRepository.findById(chatId)
      .map(chat -> {
        chat.getUsers().add(userService.getUserO(userId)
          .orElseThrow(() -> new UserNotFoundException(userId)));
        return chat;
      })
      .orElseThrow(() -> new ChatNotFoundException("Chat with id: " + chatId + " not found")));
  }

  /**
   * Method returns boolean result of user deleting from chat operation
   */
  public ResponseEntity<String> removeUserFromChat(Long userToRemoveId, Long removeInitUserId, Long chatId) throws UserNotFoundException, ChatNotFoundException {
    Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new ChatNotFoundException("Chat with id: " + chatId + " not found"));
    UserModel userToRemove = userService.findById(userToRemoveId).orElseThrow(() -> new UserNotFoundException(userToRemoveId));
    if (!userToRemove.equals(chat.getInitiatorUser()) && userToRemove.equals(removeInitUserId) && chat.getUsers().contains(userToRemove)) {
      chat.getUsers().remove(userToRemove);
      chatRepository.save(chat);
      return ResponseEntity.ok(String.format("User with id: %d was removed from chat id: %d by user with id: %d",
        userToRemoveId, chatId, removeInitUserId));
    } else
      return ResponseEntity.badRequest().body(String.format("Error in attempt to remove user with id: %d from chat id: %d by user with id: %d",
        userToRemoveId, chatId, removeInitUserId));
  }

  /**
   * Method returns pageable list of chat messages
   */
  public Page<MessageResponseDTO> getMessages(Long chatId, Integer pageSize, Integer pageNumber) {
    return messageRepository.getMessagesFromChat(chatId, Pageable.ofSize(pageSize).withPage(pageNumber))
      .map(m -> modelMapper.map(m, MessageResponseDTO.class));
  }

  /**
   * Method returns pageable chat list of user
   */
  public List<Chat> getChatList(Long userId, Integer pageSize, Integer pageNumber) {
    return chatRepository.getChatList(userId, Pageable.ofSize(pageSize).withPage(pageNumber)).toList();
  }

  /**
   * Method returns collection of user chats for only last message in each
   */
  public CustomPageImpl<ChatResponseDTO> getUserChatsWithLastMessage(Long userId, Integer pageSize, Integer pageNumber) {
    return new CustomPageImpl<>(chatRepository.getChatListForPreview(userId, Pageable.ofSize(pageSize).withPage(pageNumber)).map(array -> {
      Chat chat = (Chat) array[0];
      Message lastMessage = (Message) array[1];
      chat.setMessages(new ArrayList<>() {{
        add(lastMessage);
      }});
      return modelMapper.map(chat, ChatResponseDTO.class);
    }));
  }

  /**
   * Method returns page of message responses from user chat according to keyword matches
   */
  public Page<MessageResponseDTO> searchMessagesInChat(Long chatId, Long userId, Integer pageSize, Integer pageNumber, String keyword) {
    chatRepository.findById(chatId)
      .filter(chat -> chat.getUsers().contains(userService.findById(userId).get()) || chat.getInitiatorUser().getId().equals(userId))
      .orElseThrow(() -> new BadRequestException(String.format("User with id: %d cannot search in chat with id: %d", userId, chatId)));
    return this.messageRepository.getSearchMessageInChat(chatId, keyword, Pageable.ofSize(pageSize).withPage(pageNumber)).map(m -> modelMapper.map(m, MessageResponseDTO.class));
  }

  /**
   * Method returns page of message responses from user chats according to keyword matches
   */
  public Page<MessageResponseDTO> searchMessagesInChats(Long userId, Integer pageSize, Integer pageNumber, String keyword) {
    return messageRepository.getSearchMessages(userId, keyword, Pageable.ofSize(pageSize).withPage(pageNumber)).map(m -> modelMapper.map(m, MessageResponseDTO.class));
  }

  public Set<Long> getChatMemberIds(Long chatId) {
    Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new ChatNotFoundException(String.format("Chat with id: %d not found", chatId)));
    Set<Long> chatIds = chatRepository.findById(chatId).get().getUsers().stream().map(UserModel::getId).collect(Collectors.toSet());
    chatIds.add(chat.getInitiatorUser().getId());
    return chatIds;
  }

  public Set<String> getChatMemberEmails(Long chatId) {
    Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new ChatNotFoundException(String.format("Chat with id: %d not found", chatId)));
    Set<String> chatIds = chatRepository.findById(chatId).get().getUsers().stream().map(UserModel::getEmail).collect(Collectors.toSet());
    chatIds.add(chat.getInitiatorUser().getEmail());
    return chatIds;
  }

//  public List<Page> getSearchResult(Long userId, Integer pageSize, Integer pageNumber, String keyword){
//    Page<Object[]> result = chatRepository.getSearchResults(userId, keyword, Pageable.ofSize(pageSize).withPage(pageNumber));
//    List<UserModelResponse> fullnameUsers = new ArrayList<>();
//    List<UserModelResponse> tagUsers = new ArrayList<>();
//    List<MessageResponse> messages = new ArrayList<>();
//    List<TweetResponse> tweets = new ArrayList<>();
//    List<Page> all = new ArrayList<>();
//
//    for (Object[] objects : result.getContent()){
//      UserModel fullnameUser = (UserModel) objects[0];
//      UserModel tagUser = (UserModel) objects[1];
//      Message message = (Message) objects[2];
//      Tweet tweet = (Tweet) objects[3];
//      fullnameUsers.add(modelMapper.map(fullnameUser, UserModelResponse.class));
//      tagUsers.add(modelMapper.map(tagUser, UserModelResponse.class));
//      messages.add(modelMapper.map(message, MessageResponse.class));
//      tweets.add(modelMapper.map(tweet, TweetResponse.class));
//    }
//    all.add(new PageImpl(fullnameUsers));
//    all.add(new PageImpl(tagUsers));
//    all.add(new PageImpl(messages));
//    all.add(new PageImpl(tweets));
//    return all;
//  }
}
