package app.web;

import app.enums.TokenType;
import app.exceptions.authError.JwtAuthenticationException;
import app.security.JwtUserDetails;
import app.service.JwtTokenService;
import app.utils.SpringSecurityAuditorAware;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.util.Pair;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.converter.DefaultContentTypeResolver;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

@Log4j2
@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  private final JwtTokenService jwtTokenService;

  private final ObjectMapper objectMapper;

  private final SpringSecurityAuditorAware auditorAware;

  private TaskScheduler messageBrokerTaskScheduler;

  @Autowired
  public void setMessageBrokerTaskScheduler(@Lazy TaskScheduler taskScheduler) {
    this.messageBrokerTaskScheduler = taskScheduler;
  }

  @Override
  public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
    registration.setSendBufferSizeLimit(1024 * 1024);
    registration.setMessageSizeLimit(512 * 1024);
    registration.setSendTimeLimit(10000);
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    registry.setApplicationDestinationPrefixes("/api")
      .enableSimpleBroker("/topic/chats", "/topic/notifications")
      .setHeartbeatValue(new long[]{25000, 25000})
      .setTaskScheduler(messageBrokerTaskScheduler);
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/chat-ws").setAllowedOriginPatterns("http://localhost:3000", "http://localhost:3000/**", //TODO: need to change on deploy
      "https://final-step-fe-8-fs-2.vercel.app", "https://final-step-fe-8-fs-2.vercel.app/**");
  }

  @Override
  public boolean configureMessageConverters(List<MessageConverter> messageConverters) {
    DefaultContentTypeResolver resolver = new DefaultContentTypeResolver();
    resolver.setDefaultMimeType(MimeTypeUtils.APPLICATION_JSON);
    MappingJackson2MessageConverter converter = new MappingJackson2MessageConverter();
    converter.setObjectMapper(objectMapper);
    converter.setContentTypeResolver(resolver);
    messageConverters.add(converter);
    return false;
  }

  @Override
  @Order(Ordered.HIGHEST_PRECEDENCE + 99)
  public void configureClientInboundChannel(ChannelRegistration registration) {
    registration.interceptors(new WebSocketChannelInterceptor());
  }

  @Order(Ordered.HIGHEST_PRECEDENCE + 99)
  private class WebSocketChannelInterceptor implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
      StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
      String destination = accessor.getDestination();
      log.info("Destination:" + destination);
      log.info("Command: " + accessor.getCommand());

      if (Stream.of(StompCommand.CONNECT, StompCommand.SUBSCRIBE, StompCommand.SEND)
        .anyMatch(command -> command.equals(accessor.getCommand()))) {
        String token = jwtTokenService.extractTokenFromHeader(Objects.requireNonNull(accessor.getFirstNativeHeader("Authorization")))
          .orElseThrow(() -> new JwtAuthenticationException("Token not found!"));
        if (jwtTokenService.validateToken(token, TokenType.ACCESS)) {
          if (accessor.getCommand().equals(StompCommand.SUBSCRIBE)) {
            String userEmail = jwtTokenService.extractUserEmailFromClaims(jwtTokenService.extractClaimsFromToken(token, TokenType.ACCESS).get()).get();

            if (!((destination.equals("/topic/chats/" + userEmail)) || (destination.equals("/topic/notifications/" + userEmail)))) {
              log.info("Chat subscription check: " + destination.equals("/topic/chats/" + userEmail) + ": " + destination + " vs " + "/topic/chats/" + userEmail);
              log.info("Notification subscription check: " + destination.equals("/topic/notifications/" + userEmail) + ": " + destination + " vs " + "/topic/notifications/" + userEmail);
              log.info(userEmail + " attempts to subscribe to other user channel: " + destination);
              throw new JwtAuthenticationException("Attempt to subscribe to other user channel: " + destination);
            }
          }
          processWebSocketRequestWithToken(token, accessor);
          log.info("UserId: " + jwtTokenService.extractIdFromClaims(jwtTokenService.extractClaimsFromToken(token, TokenType.ACCESS).get()).get().toString());
        } else throw new JwtAuthenticationException("Token invalid");
      }
      return message;
    }
  }

  private void processWebSocketRequestWithToken(String token, StompHeaderAccessor accessor) {
    try {
      this.jwtTokenService.extractClaimsFromToken(token, TokenType.ACCESS)
        .flatMap(claims -> {
          Long userId = this.jwtTokenService.extractIdFromClaims(claims).get();
          String username = this.jwtTokenService.extractUserEmailFromClaims(claims).get();
          return Optional.of(Pair.of(userId, username));
        })
        .map(pair -> new JwtUserDetails(pair.getLeft(), pair.getRight()))
        .map(ud -> new UsernamePasswordAuthenticationToken(ud, "", ud.getAuthorities()))
        .ifPresent((UsernamePasswordAuthenticationToken auth) -> {
          auditorAware.setCurrentAuditor(auth.getName());
          SecurityContextHolder.getContext().setAuthentication(auth);
          accessor.setUser(auth);
          log.info("User: " + auth.getName() + " authorized");
          accessor.getSessionAttributes()
            .put("userId", jwtTokenService.extractIdFromClaims(jwtTokenService.extractClaimsFromToken(token, TokenType.ACCESS).get()).get());
          accessor.getSessionAttributes()
            .put("userEmail", jwtTokenService.extractUserEmailFromClaims(jwtTokenService.extractClaimsFromToken(token, TokenType.ACCESS).get()).get());
        });
    } catch (Exception e) {
      throw new JwtAuthenticationException("Websocket authentication failed with: " + e.getMessage());
    }
  }
}
