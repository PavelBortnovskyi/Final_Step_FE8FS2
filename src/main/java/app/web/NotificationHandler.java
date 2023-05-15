//package app.web;
//
//import app.model.Notification;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//
//public class NotificationHandler {
//  private SimpMessagingTemplate messagingTemplate;
//
//  public NotificationHandler(SimpMessagingTemplate messagingTemplate) {
//    this.messagingTemplate = messagingTemplate;
//  }
//
//  public void handleNotification(Notification notification) {
//    // Логика обработки уведомления для WebSocket
//    // Отправка уведомления подписчикам на определенную тему
//    messagingTemplate.convertAndSend("/topic/notifications", notification);
//  }
//}