package app.web;

import app.dto.rq.MessageRequest;
import app.dto.rq.NotificationRequest;
import app.dto.rs.MessageResponse;
import app.facade.MessageFacade;
import app.facade.NotificationFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

  private final MessageFacade messageFacade;

  private final NotificationFacade notificationFacade;

  private final SimpMessagingTemplate template;

  @MessageMapping("/v1/message")
  @SendTo("/topic/chats")
  public MessageResponse processChatMessage(@Payload @Valid MessageRequest messageDtoReq) {
    return this.messageFacade.save(this.messageFacade.convertToEntity(messageDtoReq));
  }

  @MessageMapping("/v1/notifications")
  @SendTo("/specific")
  public void processPrivateNotification(@Payload @Valid NotificationRequest notificationDtoReq) {
    this.template.convertAndSendToUser(notificationDtoReq.getReceiverUser().getEmail(), "/specific", notificationDtoReq);
    this.notificationFacade.save(this.notificationFacade.convertToEntity(notificationDtoReq));
  }
}