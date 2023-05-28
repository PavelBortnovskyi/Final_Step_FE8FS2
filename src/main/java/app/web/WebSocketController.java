package app.web;

import app.annotations.Marker;
import app.dto.rq.MessageRequest;
import app.dto.rq.NotificationRequest;
import app.dto.rs.MessageResponse;
import app.exceptions.httpError.BadRequestException;
import app.facade.MessageFacade;
import app.facade.NotificationFacade;
import app.service.ChatService;
import app.service.MessageService;
import app.service.NotificationService;
import app.service.UserModelService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Log4j2
@RestController
@RequiredArgsConstructor
@Validated
public class WebSocketController {

  private final MessageFacade messageFacade;

  private final NotificationFacade notificationFacade;

  private final ChatService chatService;

  private final UserModelService userService;

  private final MessageService messageService;

  private final NotificationService notificationService;

  private final SimpMessagingTemplate template;

  @Validated({Marker.New.class})
  @MessageMapping("/v1/message")
  @SendTo("/topic/chats")
  public @JsonView({Marker.ChatDetails.class}) MessageResponse processChatMessage(@Payload @Valid @JsonView({Marker.New.class})
                                                                                  MessageRequest messageDTO,
                                                                                  HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    this.chatService.addMessage(messageDTO.getChatId(), currUserId, this.messageFacade.convertToEntity(messageDTO));
    return this.messageFacade.convertToDto(this.messageFacade.convertToEntity(messageDTO));
  }

  @Validated({Marker.Existed.class})
  @PutMapping("/v1/message/edit")
  @SendTo("/topic/chats")
  public @JsonView({Marker.ChatDetails.class}) MessageResponse processChatMessageEdit(@Payload @Valid @JsonView({Marker.Existed.class})
                                                                                      MessageRequest messageDTO,
                                                                                      HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    this.messageService.changeMessage(currUserId, this.messageFacade.convertToEntity(messageDTO));
    return this.messageFacade.convertToDto(this.messageFacade.convertToEntity(messageDTO));
  }

  @DeleteMapping("/v1/message/delete")
  public void deleteMessage(@RequestParam("messageId") Long messageId, HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    if (this.messageService.deleteMessage(currUserId, messageId))
      this.template.convertAndSend("/topic/chats", new DeleteMessageNotification(messageId));
  }

  @Validated({Marker.New.class})
  @MessageMapping("/v1/notifications")
  @SendTo("/specific")
  public void processPrivateNotification(@Payload NotificationRequest notificationDtoReq) {
    this.userService.getUserO(notificationDtoReq.getReceiverUserId())
      .map(user -> {
        this.template.convertAndSendToUser(user.getEmail(), "/specific", notificationDtoReq);
        this.notificationFacade.save(this.notificationFacade.convertToEntity(notificationDtoReq));
        return user;
      })
      .orElseThrow(() -> new UsernameNotFoundException("Failed to send notification to user id: " + notificationDtoReq.getReceiverUserId()));
  }

  @PutMapping("/v1/notifications")
  @SendTo("/specific")
  public void markReadNotification(HttpServletRequest request, @RequestParam("notificationId") Long notificationId) {
    Long currUserId = (Long) request.getAttribute("userId");
    this.notificationService.findById(notificationId)
      .filter(n -> n.getReceiverUser().getId().equals(currUserId))
      .map(n -> {
        this.notificationService.setNotificationStatus(n.getId(), true);
        this.template.convertAndSendToUser(this.userService.getOne(currUserId).getEmail(), "/specific", n);
        return n;
      })
      .orElseThrow(() -> new BadRequestException(String.format("No have such notification(id: %d) for user with id: %d", notificationId, currUserId)));
  }
}