package app.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.converter.DefaultContentTypeResolver;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

import java.util.List;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Override
  public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
    registration.setMessageSizeLimit(128 * 1024);
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    registry.enableSimpleBroker("/topic/chats", "/specific");
    registry.setApplicationDestinationPrefixes("/api");
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/chat-ws").setAllowedOriginPatterns("http://localhost:3000", "https://final-step-fe-8-fs-2.vercel.app",
      "http://localhost:3000/**", "https://final-step-fe-8-fs-2.vercel.app/**"); //TODO: need to change on deploy

    registry.addEndpoint("/notifications-ws").setAllowedOriginPatterns("http://localhost:3000", "https://final-step-fe-8-fs-2.vercel.app",
      "http://localhost:3000/**", "https://final-step-fe-8-fs-2.vercel.app/**"); //TODO: need to change on deploy
  }

//  @Override
//  public boolean configureMessageConverters(List<MessageConverter> messageConverters) {
//    DefaultContentTypeResolver resolver = new DefaultContentTypeResolver();
//    resolver.setDefaultMimeType(MimeTypeUtils.APPLICATION_JSON);
//    MappingJackson2MessageConverter converter = new MappingJackson2MessageConverter();
//    converter.setObjectMapper(new ObjectMapper());
//    converter.setContentTypeResolver(resolver);
//    messageConverters.add(converter);
//    return false;
//  }
}
