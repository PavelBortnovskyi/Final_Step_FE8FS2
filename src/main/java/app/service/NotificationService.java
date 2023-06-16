package app.service;

import app.dto.rq.NotificationRequest;
import app.enums.NotificationType;
import app.model.Notification;
import app.model.Tweet;
import app.repository.NotificationModelRepository;
import app.utils.CustomPageImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class NotificationService extends GeneralService<Notification> {

  private final NotificationModelRepository notificationRepository;

  private final SimpMessagingTemplate messagingTemplate;

  private final WebSocketStompClient stompClient;

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

  public void sendNotification(Tweet tweet, Long senderUserId) {
    StompSessionHandler sessionHandler = new StompSessionHandlerAdapter() {
      @Override
      public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
        NotificationRequest notificationRequest = new NotificationRequest();
        notificationRequest.setTweetId(tweet.getParentTweetId().getId());
        notificationRequest.setInitiatorUserId(senderUserId);
        notificationRequest.setReceiverUserId(tweet.getUser().getId());
        switch (tweet.getTweetType()) {
          case QUOTE_TWEET -> notificationRequest.setNotificationType(NotificationType.QUOTE_TWEET);
          case REPLY -> notificationRequest.setNotificationType(NotificationType.REPLY);
          //TODO: add other types after merge v2 main
        };
        log.info(notificationRequest.toString());
        session.send("/api/v1/notifications/private", notificationRequest);
      }
    };
    stompClient.connect("ws://localhost:8080/notifications-ws", sessionHandler);
  }
}
