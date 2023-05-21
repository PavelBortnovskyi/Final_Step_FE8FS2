package app.service;

import app.exceptions.chatError.ChatNotFoundException;
import app.exceptions.userError.UserNotFoundException;
import app.model.Chat;
import app.model.Message;
import app.model.UserModel;
import app.repository.ChatModelRepository;
import app.repository.MessageModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService extends GeneralService<Chat> {

  private final UserModelService userService;

  private final ChatModelRepository chatRepository;

  private final MessageModelRepository messageRepository;

  public Chat createChat(Long initiatorUserId, Long interlocutorUserId) throws UserNotFoundException {
    UserModel initiator = this.userService.findById(initiatorUserId).orElseThrow(() -> new UserNotFoundException(initiatorUserId));
    UserModel interlocutor = this.userService.findById(interlocutorUserId).orElseThrow(() -> new UserNotFoundException(interlocutorUserId));
    return this.chatRepository.save(new Chat(initiator, null, new HashSet<>() {{
      add(interlocutor); add(initiator);
    }}));
  }

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

  public List<Message> getMessages(Long chatId, Integer pageSize, Integer pageNumber){
    return this.messageRepository.getMessagesFromChat(chatId, Pageable.ofSize(pageSize).withPage(pageNumber)).toList();
  }
}
