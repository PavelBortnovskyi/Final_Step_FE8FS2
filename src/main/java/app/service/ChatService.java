package app.service;

import app.model.Chat;
import app.repository.ChatModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService extends GeneralService<Chat> {

  private final UserModelService userService;

  private final ChatModelRepository chatRepository;

  public void addUser(Long userId, Long chatId){
    this.chatRepository
      .save(this.chatRepository
        .findById(chatId)
        .map(chat -> {chat.getUsers().add(this.userService.getUser(userId).get()); return chat;})
        .get());
  }
}
