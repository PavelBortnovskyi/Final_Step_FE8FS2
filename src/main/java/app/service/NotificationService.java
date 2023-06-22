package app.service;

import app.dto.rq.NotificationRequestDTO;
import app.dto.rs.NotificationResponseDTO;
import app.enums.NotificationType;
import app.enums.TweetActionType;
import app.model.Notification;
import app.model.Tweet;
import app.repository.NotificationModelRepository;
import app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Log4j2
@Service
@RequiredArgsConstructor
public class NotificationService extends GeneralService<Notification> {

  private final NotificationModelRepository notificationRepository;

  private final UserRepository userRepository;

  private final SimpMessagingTemplate template;

  private final ModelMapper modelMapper;


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

  public Tweet sendNotification(Tweet tweet, Long senderUserId, TweetActionType tweetActionType) {

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
    template.convertAndSendToUser(userRepository.findById(notificationRequestDTO.getReceiverUserId()).get().getEmail(),
      "/topic/notifications", modelMapper.map(notificationRepository.save(modelMapper.map(notificationRequestDTO, Notification.class)), NotificationResponseDTO.class));
    return tweet;
  }
}
