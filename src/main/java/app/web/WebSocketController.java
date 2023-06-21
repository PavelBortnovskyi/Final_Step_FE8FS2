package app.web;

import app.annotations.Marker;
import app.dto.rq.MessageRequestDTO;
import app.dto.rq.NotificationRequestDTO;
import app.facade.ChatFacade;
import app.facade.MessageFacade;
import app.facade.NotificationFacade;
import app.facade.UserFacade;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@CrossOrigin(originPatterns = {"http://localhost:3000", "http://localhost:8080", "https://final-step-fe-8-fs-2.vercel.app", "**", "*"})
@Log4j2
@RestController
@RequiredArgsConstructor
@Validated
public class WebSocketController {

  private final MessageFacade messageFacade;

  private final ChatFacade chatFacade;

  private final UserFacade userFacade;

  private final NotificationFacade notificationFacade;

  private final SimpMessagingTemplate template;

  @Validated({Marker.New.class})
  @MessageMapping("/v1/message")
  public void processChatMessage(@Payload @Valid @JsonView({Marker.New.class})
                                 MessageRequestDTO messageDTO,
                                 SimpMessageHeaderAccessor accessor) {
    Long currUserId = (Long) accessor.getSessionAttributes().get("userId");
    this.messageFacade.addMessageToChat(currUserId, this.messageFacade.convertToEntity(messageDTO));

    chatFacade.getChatMemberEmails(messageDTO.getChatId())
      .forEach(email -> template.convertAndSendToUser(email, "/topic/chats", this.messageFacade.convertToDto(this.messageFacade.convertToEntity(messageDTO))));
//    chatFacade.getChatMemberIds(messageDTO.getChatId())
//      .forEach(id -> template.convertAndSendToUser(id.toString(), "/topic/chats", this.messageFacade.convertToDto(this.messageFacade.convertToEntity(messageDTO))));
  }

  @Validated({Marker.Existed.class})
  @MessageMapping("/v1/message/edit")
  public void processChatMessageEdit(@Payload @Valid @JsonView({Marker.Existed.class})
                                     MessageRequestDTO messageDTO,
                                     SimpMessageHeaderAccessor accessor) {
    Long currUserId = Long.valueOf((String) accessor.getSessionAttributes().get("userId"));
    if (messageFacade.changeMessage(currUserId, messageFacade.convertToEntity(messageDTO)))
      this.template.convertAndSend(messageDTO);
  }

  @Validated({Marker.Delete.class})
  @MessageMapping("/v1/message/delete")
  public void deleteMessage(@Payload @Valid @JsonView({Marker.Delete.class})
                            MessageRequestDTO messageDTO,
                            SimpMessageHeaderAccessor accessor) {
    Long currUserId = Long.valueOf((String) accessor.getSessionAttributes().get("userId"));
    if (this.messageFacade.deleteMessage(currUserId, messageDTO))
      this.template.convertAndSend("/topic/chats", new DeleteMessageNotification(messageDTO.getId()));
  }

  @Validated({Marker.New.class})
  @MessageMapping("/v1/notifications")
  public void processPrivateNotification(@Payload @Valid @JsonView({Marker.New.class})
                                         NotificationRequestDTO notificationRequestDTO,
                                         SimpMessageHeaderAccessor accessor) {
    //Long currUserId = Long.valueOf((String) accessor.getSessionAttributes().get("userId"));
    log.info(notificationRequestDTO.toString());
    if (this.notificationFacade.processNotification(notificationRequestDTO))
      this.template.convertAndSendToUser(notificationRequestDTO.getReceiverUserId().toString(),
        "/topic/notifications", this.notificationFacade.convertToDto(this.notificationFacade.convertToEntity(notificationRequestDTO)));
  }

  @MessageMapping("/v1/notifications/mark")
  public void markReadNotification(@Payload @Valid @JsonView({Marker.Existed.class})
                                   NotificationRequestDTO notificationRequestDTO,
                                   SimpMessageHeaderAccessor accessor) {
    Long currUserId = Long.valueOf((String) accessor.getSessionAttributes().get("userId"));
    if (notificationFacade.markNotification(currUserId, notificationRequestDTO))
      this.template.convertAndSendToUser(currUserId.toString(),
        "/topic/notifications", this.notificationFacade.convertToDto(this.notificationFacade.convertToEntity(notificationRequestDTO)));
  }
}