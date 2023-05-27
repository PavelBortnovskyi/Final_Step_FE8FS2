package app.repository;

import app.model.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface NotificationModelRepository extends RepositoryInterface<Notification> {
  @Query("SELECT n FROM Notification n WHERE n.receiverUser.id = :id")
  Page<Notification> getUserNotificationsList(@Param("id") Long userId, Pageable pageable);

  @Query("SELECT n FROM Notification n WHERE n.receiverUser.id = :id AND n.isRead = false")
  Page<Notification> getUserUnreadNotificationsList(@Param("id") Long userId, Pageable pageable);

  @Query("SELECT n FROM Notification n WHERE n.receiverUser.id = :id AND n.isRead = true")
  Page<Notification> getUserSeenNotificationsList(@Param("id") Long userId, Pageable pageable);

  @Transactional
  @Modifying
  @Query("UPDATE Notification n SET n.isRead = :status WHERE n.id = :id")
  void setReadStatus(@Param("id") Long notificationId, @Param("status") boolean status);
}
