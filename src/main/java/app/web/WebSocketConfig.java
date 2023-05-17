//package app.web;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.messaging.simp.config.MessageBrokerRegistry;
//import org.springframework.web.socket.config.annotation.*;
//
//@Configuration
//@EnableWebSocketMessageBroker
//public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {
//
////  @Autowired
////  private ChatMessageHandler chatMessageHandler;
////
////  @Autowired
////  private NotificationHandler notificationHandler;
////
////  @Autowired
////  private HttpHandshakeInterceptor handshakeInterceptor;
//
//  @Override
//  public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
//    registration.setMessageSizeLimit(128 * 1024);
//  }
//
//  @Override
//  public void configureMessageBroker(MessageBrokerRegistry registry) {
//    // Включение простого брокера сообщений
//    registry.enableSimpleBroker("/topic");
//    registry.setApplicationDestinationPrefixes("/api");
//  }
////  @Override
////  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
////    // Регистрация обработчика WebSocket для чата
////    registry.addHandler(chatMessageHandler, "/chat").setAllowedOrigins("*");
////
////    // Регистрация обработчика WebSocket для уведомлений
////    registry.addHandler(notificationHandler, "/notifications").setAllowedOrigins("*");
////  }
//
//  @Override
//  public void registerStompEndpoints(StompEndpointRegistry registry) {
//    // Регистрация точки входа STOMP для чата
//    registry.addEndpoint("/chat-ws").setAllowedOriginPatterns("*").withSockJS();//.setInterceptors(handshakeInterceptor);
//
//    // Регистрация точки входа STOMP для уведомлений
//    registry.addEndpoint("/notifications-ws").withSockJS();//.setInterceptors(handshakeInterceptor);
//  }
//}
