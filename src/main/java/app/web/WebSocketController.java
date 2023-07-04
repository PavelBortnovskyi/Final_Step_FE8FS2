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
import io.swagger.annotations.ApiOperation;
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

@CrossOrigin(originPatterns = {"http://localhost:3000", "http://localhost:8080", "https://final-step-fe-8-fs-2.vercel.app"}) //TODO: change on deploy
@Log4j2
@RestController
@RequiredArgsConstructor
@Validated
public class WebSocketController {

  private final MessageFacade messageFacade;

  private final ChatFacade chatFacade;

  private final NotificationFacade notificationFacade;

  private final SimpMessagingTemplate template;

  /**
   * Websocket endpoint for accept new messageDTO via STOMP and send to chat users
   */
  @Validated({Marker.New.class})
  @MessageMapping("/v1/message")
  @ApiOperation("Send message to chat")
  public void processChatMessage(@Payload @Valid @JsonView({Marker.New.class})
                                 MessageRequestDTO messageDTO,
                                 SimpMessageHeaderAccessor accessor) {
    Long currUserId = (Long) accessor.getSessionAttributes().get("userId");

    if (messageDTO.getBody().length() > 2047)
      throw new BadRequestException("Message is too long (max size 2048 bytes)");
    log.info(messageDTO);
    MessageResponseDTO freshMessage = messageFacade.save(messageFacade.convertToEntity(messageDTO));
    log.info(freshMessage);
    if (currUserId.equals(messageDTO.getUserId())) {
      chatFacade.getChatMemberEmails(messageDTO.getChatId())
        .forEach(email -> template.convertAndSend("/topic/chats/" + email, freshMessage));
    } else
      throw new BadRequestException(String.format("You cannot send message with user with id: %d as author from account of user id: %d",
        messageDTO.getUserId(), currUserId));
  }

  /**
   * Websocket endpoint for accept edited messageDTO via STOMP and send to chat users to replace
   */
  @Validated({Marker.Existed.class})
  @MessageMapping("/v1/message/edit")
  @ApiOperation("Send edited message to replace in chat")
  public void processChatMessageEdit(@Payload @Valid @JsonView({Marker.Existed.class})
                                     MessageRequestDTO messageDTO,
                                     SimpMessageHeaderAccessor accessor) {
    Long currUserId = Long.valueOf((String) accessor.getSessionAttributes().get("userId"));

    if (messageFacade.changeMessage(currUserId, messageFacade.convertToEntity(messageDTO)))
      chatFacade.getChatMemberEmails(messageDTO.getChatId())
        .forEach(email -> template.convertAndSend("/topic/chats/" + email,
          messageFacade.convertToDto(messageFacade.convertToEntity(messageDTO))));
    else
      throw new BadRequestException(String.format("You cannot edit message with user with id: %d as author from account of user id: %d",
        messageDTO.getUserId(), currUserId));
  }

  /**
   * Websocket endpoint for accept messageDTO via STOMP and send to delete message to chat users
   */
  @Validated({Marker.Delete.class})
  @MessageMapping("/v1/message/delete")
  @ApiOperation("Send request to delete message in chat")
  public void deleteMessage(@Payload @Valid @JsonView({Marker.Delete.class})
                            MessageRequestDTO messageDTO,
                            SimpMessageHeaderAccessor accessor) {
    Long currUserId = Long.valueOf((String) accessor.getSessionAttributes().get("userId"));

    if (this.messageFacade.deleteMessage(currUserId, messageDTO))
      chatFacade.getChatMemberEmails(messageDTO.getChatId())
        .forEach(email -> template.convertAndSend("/topic/chats/" + email,
          new DeleteMessageNotification(messageDTO.getId())));
    else
      throw new BadRequestException(String.format("You cannot edit message with user with id: %d as author from account of user id: %d",
        messageDTO.getUserId(), currUserId));
  }

  /**
   * Websocket endpoint for accept notificationDTO via STOMP to mark it as read and send to receiver user
   */
  @MessageMapping("/v1/notifications/mark")
  @ApiOperation("Send request to mark user notification")
  public void markReadNotification(@Payload @Valid @JsonView({Marker.Existed.class})
                                   NotificationRequestDTO notificationRequestDTO,
                                   SimpMessageHeaderAccessor accessor) {
    Long currUserId = Long.valueOf((String) accessor.getSessionAttributes().get("userId"));
    String userEmail = (String) accessor.getSessionAttributes().get("userEmail");

    if (notificationFacade.markNotification(currUserId, notificationRequestDTO))
      this.template.convertAndSend("/topic/notifications" + userEmail,
        this.notificationFacade.convertToDto(notificationFacade.convertToEntity(notificationRequestDTO)));
    else
      throw new BadRequestException(String.format("You cannot mark notification of user with id: %d from account of user id: %d",
        notificationRequestDTO.getReceiverUserId(), currUserId));
  }
}