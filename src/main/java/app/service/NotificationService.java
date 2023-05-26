package app.service;

import app.model.Message;
import app.model.Notification;
import app.repository.NotificationModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService extends GeneralService<Notification> {

  @Autowired
  private NotificationModelRepository notificationRepository;

  public List<Notification> getUserNotifications(Long userId, Integer pageSize, Integer pageNumber) {
    return this.notificationRepository.getUserNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber)).toList();
  }

  public List<Notification> getUserUnreadNotificationsList(Long userId, Integer pageSize, Integer pageNumber) {
    return this.notificationRepository.getUserUnreadNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber)).toList();
  }

  public List<Notification> getUserSeenNotificationsList(Long userId, Integer pageSize, Integer pageNumber) {
    return this.notificationRepository.getUserSeenNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber)).toList();
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

  public Optional<Notification> findById(Long id){
    return this.notificationRepository.findById(id);
  }
}
