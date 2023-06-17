package app.facade;

import app.dto.rq.NotificationRequestDTO;
import app.dto.rs.NotificationResponseDTO;
import app.dto.rs.UserResponseDTO;
import app.exceptions.httpError.BadRequestException;
import app.exceptions.userError.UserNotFoundException;
import app.model.Notification;
import app.model.UserModel;
import app.service.NotificationService;
import app.service.UserService;
import app.utils.CustomPageImpl;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@NoArgsConstructor
public class NotificationFacade extends GeneralFacade<Notification, NotificationRequestDTO, NotificationResponseDTO> {

  @Autowired
  private NotificationService notificationService;

  @Autowired
  private UserService userService;

  @PostConstruct
  public void init() {
    super.getMm().typeMap(UserModel.class, UserResponseDTO.class)
      .addMapping(UserModel::getCountFollowers, UserResponseDTO::setCountUserFollowers)
      .addMapping(UserModel::getCountFollowings, UserResponseDTO::setCountUserFollowings)
      .addMapping(UserModel::getCountTweets, UserResponseDTO::setCountUserTweets);
  }

  /**
   * Method returns user notification responses in page format
   */
  public CustomPageImpl<NotificationResponseDTO> getAllUserNotifications(Long userId, Integer pageSize, Integer pageNumber) {
    return new CustomPageImpl<>(this.notificationService.getUserNotifications(userId, pageSize, pageNumber).map(this::convertToDto));
  }

  /**
   * Method returns user seen notification responses in page format
   */
  public CustomPageImpl<NotificationResponseDTO> getSeenUserNotifications(Long userId, Integer pageSize, Integer pageNumber) {
    return new CustomPageImpl<>(this.notificationService.getUserSeenNotificationsList(userId, pageSize, pageNumber).map(this::convertToDto));
  }

  /**
   * Method returns user not seen notification responses in page format
   */
  public CustomPageImpl<NotificationResponseDTO> getUnseenUserNotifications(Long userId, Integer pageSize, Integer pageNumber) {
    return new CustomPageImpl<>(this.notificationService.getUserUnreadNotificationsList(userId, pageSize, pageNumber).map(this::convertToDto));
  }

  public boolean processNotification(NotificationRequestDTO notification) {
    this.userService.getUserO(notification.getReceiverUserId()).map(user -> {
        this.notificationService.save(this.convertToEntity(notification));
        return user;
      })
      .orElseThrow(() -> new UserNotFoundException("Failed to send notification to user id: " + notification.getReceiverUserId()));
    return true;
  }

  public boolean markNotification(Long userId, NotificationRequestDTO notification){
    this.notificationService.findById(notification.getId())
      .filter(n -> n.getReceiverUser().getId().equals(userId))
      .map(n -> {
        this.notificationService.setNotificationStatus(n.getId(), true);
        return n;
      })
      .orElseThrow(() -> new BadRequestException(String.format("No have such notification(id: %d) for user with id: %d", notification.getId(), userId)));
    return true;
  }
}
