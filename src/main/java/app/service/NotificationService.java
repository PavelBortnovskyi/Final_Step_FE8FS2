package app.service;

import app.dto.rq.NotificationRequestDTO;
import app.enums.NotificationType;
import app.enums.TweetActionType;
import app.model.Notification;
import app.model.Tweet;
import app.repository.NotificationModelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.util.Collections;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Log4j2
@Service
@RequiredArgsConstructor
public class NotificationService extends GeneralService<Notification> {

  private final NotificationModelRepository notificationRepository;

  @Value("${socket.host}")
  private String socketUri;

  /**
   * Method returns user notification in page format
   */
  public Page<Notification> getUserNotifications(Long userId, Integer pageSize, Integer pageNumber) {
    return this.notificationRepository.getUserNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber));
  }

  /**
   * Method returns user seen notification in page format
   */
  public Page<Notification> getUserSeenNotificationsList(Long userId, Integer pageSize, Integer pageNumber) {
    return this.notificationRepository.getUserSeenNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber));
  }

  /**
   * Method returns user not seen notification in page format
   */
  public Page<Notification> getUserUnreadNotificationsList(Long userId, Integer pageSize, Integer pageNumber) {
    return this.notificationRepository.getUserUnreadNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber));
  }

  /**
   * Method changes notification isRead status
   */
  public void setNotificationStatus(Long notificationId, boolean status) {
    this.notificationRepository.setReadStatus(notificationId, status);
  }

  /**
   * Method returns boolean value of presence notification with id in DB
   */
  public boolean isPresent(Long notificationId) {
    return this.notificationRepository.findById(notificationId).isPresent();
  }

  /**
   * Method returns boolean value of removing notification from DB attempt
   */
  public boolean remove(Long notificationId) {
    if (this.notificationRepository.findById(notificationId).isPresent()) {
      this.notificationRepository.deleteById(notificationId);
      return true;
    } else return false;
  }

  /**
   * Method returns optional of notification by id
   */
  public Optional<Notification> findById(Long id) {
    return this.notificationRepository.findById(id);
  }

  public Tweet sendNotification(Tweet tweet, Long senderUserId, TweetActionType tweetActionType) throws ExecutionException, InterruptedException {
    SockJsClient sockJsClient = new SockJsClient(
      Collections.singletonList(new WebSocketTransport(new StandardWebSocketClient())));

    WebSocketStompClient stompClient = new WebSocketStompClient(sockJsClient);

    StompSessionHandler sessionHandler = new StompSessionHandlerAdapter() {
      @Override
      public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
        NotificationRequestDTO notificationRequestDTO = new NotificationRequestDTO()
          .setInitiatorUserId(senderUserId)
          .setTweetId(tweet.getId());

        if (tweetActionType != null && tweetActionType.equals(TweetActionType.LIKE)) {
          notificationRequestDTO.setReceiverUserId(tweet.getUser().getId())
            .setNotificationType(NotificationType.LIKE);
        } else {
          notificationRequestDTO.setReceiverUserId(tweet.getParentTweet().getUser().getId());

          switch (tweet.getTweetType()) {
            case QUOTE_TWEET -> notificationRequestDTO.setNotificationType(NotificationType.QUOTE_TWEET);
            case REPLY -> notificationRequestDTO.setNotificationType(NotificationType.REPLY);
            case RETWEET -> notificationRequestDTO.setNotificationType(NotificationType.RETWEET);
          }
        }

        log.info("Sending:" + notificationRequestDTO.toString());

        StompHeaders stompHeaders = new StompHeaders();
        stompHeaders.setDestination("/api/v1/notifications");
        stompHeaders.set("Origin", socketUri.substring(0, socketUri.lastIndexOf("/chat-ws")));
        session.send("/api/v1/notifications", notificationRequestDTO);
      }
    };
    stompClient.connect(socketUri, sessionHandler);
    log.info("Connected to socket: " + socketUri);
    return tweet;
  }
}
