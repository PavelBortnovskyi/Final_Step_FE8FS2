package app.web;

import app.annotations.Marker;
import app.dto.rq.MessageRequest;
import app.dto.rq.NotificationRequest;
import app.dto.rs.MessageResponse;
import app.exceptions.httpError.BadRequestException;
import app.exceptions.userError.UserNotFoundException;
import app.facade.ChatFacade;
import app.facade.MessageFacade;
import app.facade.NotificationFacade;
import app.security.JwtUserDetails;
import app.service.MessageService;
import app.service.NotificationService;
import app.service.UserService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;

@Log4j2
@RestController
@RequiredArgsConstructor
@Validated
public class WebSocketController {

  private final MessageFacade messageFacade;

  private final NotificationFacade notificationFacade;

  private final SimpMessagingTemplate template;

  @Validated({Marker.New.class})
  @MessageMapping("/v1/message")
  @SendTo("/topic/chats")
  public @JsonView({Marker.ChatDetails.class}) MessageResponse processChatMessage(@Payload @Valid @JsonView({Marker.New.class})
                                                                                  MessageRequest messageDTO,
                                                                                  SimpMessageHeaderAccessor accessor) {
    Long currUserId = Long.valueOf((String) accessor.getSessionAttributes().get("userId"));
    return this.messageFacade.addMessageToChat(currUserId, this.messageFacade.convertToEntity(messageDTO));
  }

  @Validated({Marker.Existed.class})
  @MessageMapping("/v1/message/edit")
  public void processChatMessageEdit(@Payload @Valid @JsonView({Marker.Existed.class})
                                     MessageRequest messageDTO,
                                     SimpMessageHeaderAccessor accessor) {
    Long currUserId = Long.valueOf((String) accessor.getSessionAttributes().get("userId"));
    if (messageFacade.changeMessage(currUserId, messageFacade.convertToEntity(messageDTO)))
      this.template.convertAndSend(messageDTO);
  }

  @Validated({Marker.Delete.class})
  @MessageMapping("/v1/message/delete")
  public void deleteMessage(@Payload @Valid @JsonView({Marker.Delete.class})
                            MessageRequest messageDTO,
                            SimpMessageHeaderAccessor accessor) {
    Long currUserId = Long.valueOf((String) accessor.getSessionAttributes().get("userId"));
    if (this.messageFacade.deleteMessage(currUserId, messageDTO))
      this.template.convertAndSend("/topic/chats", new DeleteMessageNotification(messageDTO.getId()));
  }

  @Validated({Marker.New.class})
  @MessageMapping("/v1/notifications/private")
  public void processPrivateNotification(@Payload @Valid @JsonView({Marker.New.class})
                                         NotificationRequest notificationRequestDTO,
                                         SimpMessageHeaderAccessor accessor) {
    Long currUserId = Long.valueOf((String) accessor.getSessionAttributes().get("userId"));
    if (this.notificationFacade.processNotification(notificationRequestDTO))
      this.template.convertAndSendToUser(currUserId.toString(),
        "/specific", this.notificationFacade.convertToDto(this.notificationFacade.convertToEntity(notificationRequestDTO)));
  }

  @MessageMapping("/v1/notifications/mark")
  @SendTo("/specific")
  public void markReadNotification(@Payload @Valid @JsonView({Marker.Existed.class})
                                   NotificationRequest notificationRequestDTO,
                                   SimpMessageHeaderAccessor accessor) {
    Long currUserId = Long.valueOf((String) accessor.getSessionAttributes().get("userId"));
    if (notificationFacade.markNotification(currUserId, notificationRequestDTO))
      this.template.convertAndSendToUser(currUserId.toString(),
        "/specific", this.notificationFacade.convertToDto(this.notificationFacade.convertToEntity(notificationRequestDTO)));
  }
}