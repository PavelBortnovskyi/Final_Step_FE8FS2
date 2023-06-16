package app.service;

import app.model.Notification;
import app.repository.NotificationModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NotificationService extends GeneralService<Notification> {

  @Autowired
  private NotificationModelRepository notificationRepository;

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
}
