//package app.web;
//
//import app.dto.rq.MessageRequest;
//import app.dto.rq.NotificationRequest;
//import app.dto.rs.MessageResponse;
//import app.facade.MessageFacade;
//import app.facade.NotificationFacade;
//import lombok.RequiredArgsConstructor;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequiredArgsConstructor
//public class WebSocketController {
//
//  private final MessageFacade messageFacade;
//
//  private final NotificationFacade notificationFacade;
//
//  @MessageMapping("/v1/message")
//  @SendTo("/topic/chat")
//  public MessageResponse processChatMessage(@Payload MessageRequest messageDtoReq) {
//    return this.messageFacade.save(this.messageFacade.convertToEntity(messageDtoReq));
//  }
//
//  @MessageMapping("/notifications")
//  @SendTo("/topic/notifications")
//  public void processNotification(@Payload NotificationRequest notificationDtoReq) {
//    this.notificationFacade.save(this.notificationFacade.convertToEntity(notificationDtoReq));
//  }
//}