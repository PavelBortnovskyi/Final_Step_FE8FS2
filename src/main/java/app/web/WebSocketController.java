package app.web;

import app.dto.rq.MessageRequest;
import app.dto.rq.NotificationRequest;
import app.dto.rs.MessageResponse;
import app.exceptions.chatError.ChatNotFoundException;
import app.facade.MessageFacade;
import app.facade.NotificationFacade;
import app.service.ChatService;
import app.service.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Log4j2
@RestController
@RequiredArgsConstructor
public class WebSocketController {

  private final MessageFacade messageFacade;

  private final NotificationFacade notificationFacade;

  private final ChatService chatService;

  private final UserModelService userModelService;

  private final SimpMessagingTemplate template;

  @MessageMapping("/v1/message")
  @SendTo("/topic/chats")
  public MessageResponse processChatMessage(@Payload @Valid MessageRequest messageDtoReq) throws ChatNotFoundException {
    this.chatService.findById(messageDtoReq.getChat().getId())
      .map(chat -> {
        this.userModelService.getUser(messageDtoReq.getUser().getId())
          .orElseThrow(() -> new UsernameNotFoundException("User with id: " + messageDtoReq.getUser().getId() + " not found!"));
        chat.getMessages().add(this.messageFacade.convertToEntity(messageDtoReq));
        this.chatService.save(chat);
        return chat;
      })
      .orElseThrow(() -> new ChatNotFoundException("Chat with id: " + messageDtoReq.getChat().getId() + " not found!"));
    return this.messageFacade.save(this.messageFacade.convertToEntity(messageDtoReq));
  }

  @MessageMapping("/v1/notifications")
  @SendTo("/specific")
  public void processPrivateNotification(@Payload @Valid NotificationRequest notificationDtoReq) {
    this.template.convertAndSendToUser(notificationDtoReq.getReceiverUser().getEmail(), "/specific", notificationDtoReq);
    this.notificationFacade.save(this.notificationFacade.convertToEntity(notificationDtoReq));
  }
}