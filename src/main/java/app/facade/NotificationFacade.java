package app.facade;

import app.dto.rq.NotificationRequest;
import app.dto.rs.NotificationResponse;
import app.model.Notification;
import app.service.NotificationService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class NotificationFacade extends GeneralFacade<Notification, NotificationRequest, NotificationResponse> {

  @Autowired
  private NotificationService notificationService;

  /**
   * Method returns user notification responses in page format
   */
  public Page<NotificationResponse> getAllUserNotifications(Long userId, Integer pageSize, Integer pageNumber) {
    return new PageImpl<>(this.notificationService.getUserNotifications(userId, pageSize, pageNumber - 1)
      .map(this::convertToDto)
      .toList());
  }

  /**
   * Method returns user seen notification responses in page format
   */
  public Page<NotificationResponse> getSeenUserNotifications(Long userId, Integer pageSize, Integer pageNumber) {
    return new PageImpl<>(this.notificationService.getUserSeenNotificationsList(userId, pageSize, pageNumber - 1)
      .map(this::convertToDto)
      .toList());
  }

  /**
   * Method returns user not seen notification responses in page format
   */
  public Page<NotificationResponse> getUnseenUserNotifications(Long userId, Integer pageSize, Integer pageNumber) {
    return new PageImpl<>(this.notificationService.getUserUnreadNotificationsList(userId, pageSize, pageNumber - 1)
      .map(this::convertToDto)
      .toList());
  }
}
