package app.facade;

import app.dto.rq.NotificationRequest;
import app.dto.rs.NotificationResponse;
import app.model.Notification;
import app.service.NotificationService;
import app.utils.CustomPageImpl;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class NotificationFacade extends GeneralFacade<Notification, NotificationRequest, NotificationResponse> {

  @Autowired
  private NotificationService notificationService;

  /**
   * Method returns user notification responses in page format
   */
  public CustomPageImpl<NotificationResponse> getAllUserNotifications(Long userId, Integer pageSize, Integer pageNumber) {
    return new CustomPageImpl<>(this.notificationService.getUserNotifications(userId, pageSize, pageNumber).map(this::convertToDto));
  }

  /**
   * Method returns user seen notification responses in page format
   */
  public CustomPageImpl<NotificationResponse> getSeenUserNotifications(Long userId, Integer pageSize, Integer pageNumber) {
    return new CustomPageImpl<>(this.notificationService.getUserSeenNotificationsList(userId, pageSize, pageNumber).map(this::convertToDto));
  }

  /**
   * Method returns user not seen notification responses in page format
   */
  public CustomPageImpl<NotificationResponse> getUnseenUserNotifications(Long userId, Integer pageSize, Integer pageNumber) {
    return new CustomPageImpl<>(this.notificationService.getUserUnreadNotificationsList(userId, pageSize, pageNumber).map(this::convertToDto));
  }
}
