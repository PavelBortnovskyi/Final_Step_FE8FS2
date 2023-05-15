//package app.web;
//
//import app.model.Message;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.event.EventListener;
//import org.springframework.messaging.simp.SimpMessageSendingOperations;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.stereotype.Component;
//import org.springframework.web.socket.messaging.SessionConnectedEvent;
//import org.springframework.web.socket.messaging.SessionDisconnectEvent;
//
//@Log4j2
//@Component
//public class WebSocketEventListener {
//
//  @Autowired
//  private SimpMessageSendingOperations messagingTemplate;
//
//  @EventListener
//  public void handleWebSocketConnectListener(SessionConnectedEvent event) {
//  }
//
//  @EventListener
//  public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
//    StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//
//    String username = (String) headerAccessor.getSessionAttributes().get("username");
//
//    if(username != null) {
//      log.info("User Disconnected : " + username);
//
//      Message chatMessage = new Message();
//      chatMessage.
//      chatMessage.setType(ChatMessage.MessageType.LEAVE);
//      chatMessage.setUser(username);
//
//      messagingTemplate.convertAndSend("/topic/publicChatRoom", chatMessage);
//
//  }
//}
