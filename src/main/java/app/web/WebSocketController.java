package app.web;

import app.dto.rq.MessageRequest;
import app.dto.rq.NotificationRequest;
import app.dto.rs.MessageResponse;
import app.dto.rs.NotificationResponse;
import app.model.Message;
import app.model.Notification;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

  @MessageMapping("/chat/message")
  @SendTo("/topic/chat")
  public MessageResponse processChatMessage(MessageRequest message) {
    // Обработка входящего сообщения чата
    // Можно выполнить дополнительную логику, например, сохранение сообщения в базе данных

    // Возвращение обработанного сообщения
    return new MessageResponse();
  }

  @MessageMapping("/notifications")
  @SendTo("/topic/notifications")
  public NotificationResponse processNotification(NotificationRequest message) {
    // Обработка входящего уведомления
    // Можно выполнить дополнительную логику, например, отправку уведомления другим пользователям

    // Возвращение обработанного уведомления
    return new NotificationResponse();
  }
}