package app.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Autowired
  private ChatMessageHandler chatMessageHandler;

  @Autowired
  private NotificationHandler notificationHandler;

  @Autowired
  private HttpHandshakeInterceptor handshakeInterceptor;

  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    // Включение простого брокера сообщений
    registry.enableSimpleBroker("/topic");
    registry.setApplicationDestinationPrefixes("/api/v1");
  }

//  @Override
//  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//    // Регистрация обработчика WebSocket для чата
//    registry.addHandler(chatMessageHandler, "/chat").setAllowedOrigins("*");
//
//    // Регистрация обработчика WebSocket для уведомлений
//    registry.addHandler(notificationHandler, "/notifications").setAllowedOrigins("*");
//  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    // Регистрация точки входа STOMP для чата
    registry.addEndpoint("/chat-ws").withSockJS().setInterceptors(handshakeInterceptor);

    // Регистрация точки входа STOMP для уведомлений
    registry.addEndpoint("/notifications-ws").withSockJS().setInterceptors(handshakeInterceptor);
  }
}
