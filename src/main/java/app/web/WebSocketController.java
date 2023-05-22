package app.web;

import app.annotations.Marker;
import app.dto.rq.MessageRequest;
import app.dto.rq.NotificationRequest;
import app.dto.rs.MessageResponse;
import app.exceptions.chatError.ChatNotFoundException;
import app.exceptions.userError.UserNotFoundException;
import app.facade.MessageFacade;
import app.facade.NotificationFacade;
import app.service.ChatService;
import app.service.MessageService;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
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

  private final SimpMessagingTemplate template;

  @Validated({Marker.forNew.class})
  @MessageMapping("/v1/message")
  @SendTo("/topic/chats")
  public @JsonView({Marker.ChatDetails.class}) MessageResponse processChatMessage(@Payload @Valid @JsonView({Marker.forNew.class})
                                                                                  MessageRequest messageDTO,
                                                                                  HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    this.chatService.addMessage(messageDTO.getChatId(), currUserId, this.messageFacade.convertToEntity(messageDTO));
    return this.messageFacade.convertToDto(this.messageFacade.convertToEntity(messageDTO));
  }

  @Validated({Marker.forExisted.class})
  @PutMapping("/v1/message/edit")
  @SendTo("/topic/chats")
  public @JsonView({Marker.ChatDetails.class}) MessageResponse processChatMessageEdit(@Payload @Valid @JsonView({Marker.forExisted.class})
                                                                                      MessageRequest messageDTO,
                                                                                      HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    this.messageService.changeMessage(currUserId, this.messageFacade.convertToEntity(messageDTO));
    return this.messageFacade.convertToDto(this.messageFacade.convertToEntity(messageDTO));
  }

  @DeleteMapping("/v1/message/delete/{messageId}")
  public void deleteMessage(@PathVariable Long messageId, HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    if (this.messageService.deleteMessage(currUserId, messageId))
      this.template.convertAndSendToUser(currUserId.toString(), "/message/delete", messageId);
  }

  @MessageMapping("/v1/notifications")
  @SendTo("/specific")
  public void processPrivateNotification(@Payload @Valid NotificationRequest notificationDtoReq) {
    this.userService.getUser(notificationDtoReq.getReceiverUser().getId())
      .map(user -> {
        this.template.convertAndSendToUser(user.getEmail(), "/specific", notificationDtoReq);
        this.notificationFacade.save(this.notificationFacade.convertToEntity(notificationDtoReq));
        return user;
      })
      .orElseThrow(() -> new UsernameNotFoundException("Failed to send notification to user id: " + notificationDtoReq.getReceiverUser().getId()));
  }
}