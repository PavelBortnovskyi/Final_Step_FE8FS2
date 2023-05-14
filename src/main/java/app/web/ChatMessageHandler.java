package app.web;

import app.model.Message;
import app.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
public class ChatMessageHandler extends TextWebSocketHandler {

  private final ChatService chatService;

  @Autowired
  public ChatMessageHandler(ChatService chatService) {
    this.chatService = chatService;
  }

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    // Получение текстового сообщения от клиента
    String payload = message.getPayload();

    // Обработка сообщения чата
    Message chatMessage = chatService.processChatMessage(payload);

    // Отправка сообщения всем подключенным клиентам
    sendMessageToAll(chatMessage);
  }

  @Override
  public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    // Код, выполняемый после установки соединения с клиентом
    // Можно выполнить дополнительные действия, например, добавить клиента в список подключенных пользователей
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    // Код, выполняемый после разрыва соединения с клиентом
    // Можно выполнить дополнительные действия, например, удалить клиента из списка подключенных пользователей
  }

  private void sendMessageToAll(Message message) throws IOException {
    // Получение всех активных сессий клиентов
    List<WebSocketSession> sessions = getSessions();

    // Отправка сообщения всем клиентам
    for (WebSocketSession session : sessions) {
      session.sendMessage(new TextMessage(message.toJson()));
    }
  }

  private List<WebSocketSession> getSessions() {
    // Получение всех активных сессий клиентов
    // Реализация зависит от вашей системы управления сессиями, например, можно хранить активные сессии в списке или в базе данных
    // В этом примере возвращается пустой список
    return Collections.emptyList();
  }
}
