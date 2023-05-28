package app.service;

import app.dto.rs.NotificationResponse;
import app.model.Notification;
import app.repository.NotificationModelRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NotificationService extends GeneralService<Notification> {

  @Autowired
  private ModelMapper mm;

  @Autowired
  private NotificationModelRepository notificationRepository;

  public Page<NotificationResponse> getUserNotifications(Long userId, Integer pageSize, Integer pageNumber) {
    return this.notificationRepository.getUserNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber)).map(n -> mm.map(n, NotificationResponse.class));
  }

  public Page<NotificationResponse> getUserUnreadNotificationsList(Long userId, Integer pageSize, Integer pageNumber) {
    return this.notificationRepository.getUserUnreadNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber)).map(n -> mm.map(n, NotificationResponse.class));
  }

  public Page<NotificationResponse> getUserSeenNotificationsList(Long userId, Integer pageSize, Integer pageNumber) {
    return this.notificationRepository.getUserSeenNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber)).map(n -> mm.map(n, NotificationResponse.class));
  }

  public void setNotificationStatus(Long notificationId, boolean status) {
    this.notificationRepository.setReadStatus(notificationId, status);
  }

  public boolean isPresent(Long notificationId) {
    return this.notificationRepository.findById(notificationId).isPresent();
  }

  public boolean remove(Long notificationId) {
    if (this.notificationRepository.findById(notificationId).isPresent()) {
      this.notificationRepository.deleteById(notificationId);
      return true;
    } else return false;
  }

  public Optional<Notification> findById(Long id) {
    return this.notificationRepository.findById(id);
  }
}
