package app.web;

import app.dto.rq.MessageRequest;
import app.dto.rq.NotificationRequest;
import app.dto.rs.MessageResponse;
import app.dto.rs.NotificationResponse;
import app.facade.MessageFacade;
import app.facade.NotificationFacade;
import app.model.Message;
import app.model.Notification;
import app.service.ChatService;
import app.service.MessageService;
import app.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
public class WebSocketController {

  private final MessageFacade messageFacade;

  private final NotificationFacade notificationFacade;

  @MessageMapping("/chat/message")
  @SendTo("/topic/chat")
  public MessageResponse processChatMessage(@RequestBody MessageRequest messageDtoReq) {
    return this.messageFacade.save(this.messageFacade.convertToEntity(messageDtoReq));
  }

  @MessageMapping("/notifications")
  @SendTo("/topic/notifications")
  public NotificationResponse processNotification(@RequestBody NotificationRequest notificationDtoReq) {
    return this.notificationFacade.save(this.notificationFacade.convertToEntity(notificationDtoReq));
  }
}