package app.web;

import app.annotations.Marker;
import app.dto.rq.MessageRequestDTO;
import app.dto.rq.NotificationRequestDTO;
import app.dto.rs.MessageResponseDTO;
import app.exceptions.httpError.BadRequestException;
import app.facade.ChatFacade;
import app.facade.MessageFacade;
import app.facade.NotificationFacade;
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

@CrossOrigin(originPatterns = {"http://localhost:3000", "http://localhost:8080", "https://final-step-fe-8-fs-2.vercel.app", "*"})
//TODO: change on deploy
@Log4j2
@RestController
@RequiredArgsConstructor
@Validated
public class WebSocketController {

  private final MessageFacade messageFacade;

  private final ChatFacade chatFacade;

  private final NotificationFacade notificationFacade;

  private final SimpMessagingTemplate template;

  @Validated({Marker.New.class})
  @MessageMapping("/v1/message")
  public void processChatMessage(@Payload @Valid @JsonView({Marker.New.class})
                                 MessageRequestDTO messageDTO,
                                 SimpMessageHeaderAccessor accessor) {
    Long currUserId = (Long) accessor.getSessionAttributes().get("userId");

    String message = messageDTO.getBody();
    message = "SomePrefix" + message;
    messageDTO.setBody(message);

    if (currUserId.equals(messageDTO.getUserId())) {
      MessageResponseDTO finalFreshMessage = this.messageFacade.save(this.messageFacade.convertToEntity(messageDTO));
      chatFacade.getChatMemberEmails(messageDTO.getChatId())
        .forEach(email -> template.convertAndSend("/topic/chats/" + email, finalFreshMessage));
    } else
      throw new BadRequestException(String.format("You cannot send message with user with id: %d as author from account of user id: %d", messageDTO.getUserId(), currUserId));
  }

  @Validated({Marker.Existed.class})
  @MessageMapping("/v1/message/edit")
  public void processChatMessageEdit(@Payload @Valid @JsonView({Marker.Existed.class})
                                     MessageRequestDTO messageDTO,
                                     SimpMessageHeaderAccessor accessor) {
    Long currUserId = Long.valueOf((String) accessor.getSessionAttributes().get("userId"));

    if (messageFacade.changeMessage(currUserId, messageFacade.convertToEntity(messageDTO)))
      chatFacade.getChatMemberEmails(messageDTO.getChatId())
        .forEach(email -> template.convertAndSend("/topic/chats/" + email, messageFacade.convertToDto(messageFacade.convertToEntity(messageDTO))));
    else  throw new BadRequestException(String.format("You cannot edit message with user with id: %d as author from account of user id: %d", messageDTO.getUserId(), currUserId));
  }

  @Validated({Marker.Delete.class})
  @MessageMapping("/v1/message/delete")
  public void deleteMessage(@Payload @Valid @JsonView({Marker.Delete.class})
                            MessageRequestDTO messageDTO,
                            SimpMessageHeaderAccessor accessor) {
    Long currUserId = Long.valueOf((String) accessor.getSessionAttributes().get("userId"));

    if (this.messageFacade.deleteMessage(currUserId, messageDTO))
      chatFacade.getChatMemberEmails(messageDTO.getChatId())
        .forEach(email -> template.convertAndSend("/topic/chats/" + email, new DeleteMessageNotification(messageDTO.getId())));
    else  throw new BadRequestException(String.format("You cannot edit message with user with id: %d as author from account of user id: %d", messageDTO.getUserId(), currUserId));
  }

  @MessageMapping("/v1/notifications/mark")
  public void markReadNotification(@Payload @Valid @JsonView({Marker.Existed.class})
                                   NotificationRequestDTO notificationRequestDTO,
                                   SimpMessageHeaderAccessor accessor) {
    Long currUserId = Long.valueOf((String) accessor.getSessionAttributes().get("userId"));
    String userEmail = (String) accessor.getSessionAttributes().get("userEmail");

    if (notificationFacade.markNotification(currUserId, notificationRequestDTO))
      this.template.convertAndSend("/topic/notifications" + userEmail, this.notificationFacade.convertToDto(this.notificationFacade.convertToEntity(notificationRequestDTO)));
    else  throw new BadRequestException(String.format("You cannot mark notification of user with id: %d from account of user id: %d", notificationRequestDTO.getReceiverUserId(), currUserId));
  }
}