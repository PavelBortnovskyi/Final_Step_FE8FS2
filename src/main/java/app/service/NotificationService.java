package app.service;

import app.annotations.Marker;
import app.dto.rq.NotificationRequestDTO;
import app.dto.rs.NotificationResponseDTO;
import app.enums.NotificationType;
import app.enums.TweetActionType;
import app.enums.TweetType;
import app.model.Notification;
import app.model.Tweet;
import app.repository.NotificationModelRepository;
import app.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
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

  private final ObjectMapper objectMapper;


  /**
   * Method returns user notification in page format
   */
  public Page<Notification> getUserNotifications(Long userId, Integer pageSize, Integer pageNumber) {
    return notificationRepository.getUserNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber));
  }

  /**
   * Method returns user seen notification in page format
   */
  public Page<Notification> getUserSeenNotificationsList(Long userId, Integer pageSize, Integer pageNumber) {
    return notificationRepository.getUserSeenNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber));
  }

  /**
   * Method returns user not seen notification in page format
   */
  public Page<Notification> getUserUnreadNotificationsList(Long userId, Integer pageSize, Integer pageNumber) {
    return notificationRepository.getUserUnreadNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber));
  }

  /**
   * Method changes notification isRead status
   */
  public void setNotificationStatus(Long notificationId, boolean status) {
    notificationRepository.setReadStatus(notificationId, status);
  }

  /**
   * Method returns boolean value of presence notification with id in DB
   */
  public boolean isPresent(Long notificationId) {
    return notificationRepository.findById(notificationId).isPresent();
  }

  /**
   * Method returns boolean value of removing notification from DB attempt
   */
  public boolean remove(Long notificationId) {
    if (notificationRepository.findById(notificationId).isPresent()) {
      notificationRepository.deleteById(notificationId);
      return true;
    } else return false;
  }

  /**
   * Method returns optional of notification by id
   */
  public Optional<Notification> findById(Long id) {
    return notificationRepository.findById(id);
  }

  /**
   * Method sends notificationResponseDto to tweet author in websocket topic/notification/username
   */
  public Tweet sendNotification(Tweet tweet, Long senderUserId, TweetActionType tweetActionType) throws JsonProcessingException {
    NotificationRequestDTO notificationRequestDTO = new NotificationRequestDTO()
      .setInitiatorUserId(senderUserId)
      .setTweetId(tweet.getId());

    if (!tweet.getUser().getId().equals(senderUserId) && notificationRepository.getLikeNotification(senderUserId, tweet.getId()).isEmpty()
      && tweetActionType != null && tweetActionType.equals(TweetActionType.LIKE)) {
      notificationRequestDTO.setReceiverUserId(tweet.getUser().getId())
        .setNotificationType(NotificationType.LIKE);
    }

    if (tweetActionType == null && !tweet.getTweetType().equals(TweetType.TWEET)
      && tweet.getParentTweet() != null && !tweet.getParentTweet().getUser().getId().equals(senderUserId)) {
      notificationRequestDTO.setReceiverUserId(tweet.getParentTweet().getUser().getId());
      switch (tweet.getTweetType()) {
        case QUOTE_TWEET -> notificationRequestDTO.setNotificationType(NotificationType.QUOTE_TWEET);
        case REPLY -> notificationRequestDTO.setNotificationType(NotificationType.REPLY);
        case RETWEET -> notificationRequestDTO.setNotificationType(NotificationType.RETWEET);
      }
    }
    if (notificationRequestDTO.getReceiverUserId() != null) {
      MappingJackson2MessageConverter converter = new MappingJackson2MessageConverter();
      objectMapper.setConfig(objectMapper.getSerializationConfig().withView(Marker.Preview.class));
      converter.setObjectMapper(objectMapper);
      template.setMessageConverter(converter);
      template.convertAndSend("/topic/notifications/" + userRepository.findById(notificationRequestDTO.getReceiverUserId()).get().getEmail(),
        modelMapper.map(notificationRepository.save(modelMapper.map(notificationRequestDTO, Notification.class)), NotificationResponseDTO.class));
    }
    return tweet;
  }
}
