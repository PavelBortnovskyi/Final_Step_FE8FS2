import app.model.Notification;
import app.repository.UserRepository;
import app.repository.NotificationModelRepository;
import app.service.NotificationService;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class NotificationServiceTest {
  private NotificationModelRepository notificationRepository = mock(NotificationModelRepository.class);
  private Notification notification = mock(Notification.class);
  private UserRepository userRepository = mock(UserRepository.class);
  private SimpMessagingTemplate template = mock(SimpMessagingTemplate.class);
  private ModelMapper modelMapper = mock(ModelMapper.class);
  private NotificationService notificationService = new NotificationService(notificationRepository, userRepository, template ,modelMapper);

  @Test
  void testGetUserNotifications() {
    Long userId = 1L;
    Integer pageSize = 10;
    Integer pageNumber = 1;
    Page<Notification> page = mock(Page.class);

    when(notificationRepository.getUserNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber))).thenReturn(page);

    Page<Notification> result = notificationService.getUserNotifications(userId, pageSize, pageNumber);

    assertThat(result).isEqualTo(page);
    verify(notificationRepository).getUserNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber));
  }

  @Test
  void testGetUserSeenNotificationsList() {
    Long userId = 1L;
    Integer pageSize = 10;
    Integer pageNumber = 1;
    Page<Notification> page = mock(Page.class);

    when(notificationRepository.getUserSeenNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber))).thenReturn(page);

    Page<Notification> result = notificationService.getUserSeenNotificationsList(userId, pageSize, pageNumber);

    assertThat(result).isEqualTo(page);
    verify(notificationRepository).getUserSeenNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber));
  }

  @Test
  void testGetUserUnreadNotificationsList() {
    Long userId = 1L;
    Integer pageSize = 10;
    Integer pageNumber = 1;
    Page<Notification> page = mock(Page.class);

    when(notificationRepository.getUserUnreadNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber))).thenReturn(page);

    Page<Notification> result = notificationService.getUserUnreadNotificationsList(userId, pageSize, pageNumber);

    assertThat(result).isEqualTo(page);
    verify(notificationRepository).getUserUnreadNotificationsList(userId, Pageable.ofSize(pageSize).withPage(pageNumber));
  }

  @Test
  void testSetNotificationStatus() {
    Long notificationId = 1L;
    boolean status = true;

    notificationService.setNotificationStatus(notificationId, status);

    verify(notificationRepository).setReadStatus(notificationId, status);
  }

  @Test
  void testIsPresent_True() {
    Long notificationId = 1L;

    when(notificationRepository.findById(notificationId)).thenReturn(Optional.of(new Notification()));

    boolean result = notificationService.isPresent(notificationId);

    assertThat(result).isTrue();
    verify(notificationRepository).findById(notificationId);
  }

  @Test
  void testIsPresent_False() {
    Long notificationId = 1L;

    when(notificationRepository.findById(notificationId)).thenReturn(Optional.empty());

    boolean result = notificationService.isPresent(notificationId);

    assertThat(result).isFalse();
    verify(notificationRepository).findById(notificationId);
  }

  @Test
  void testRemove_NotificationExists() {
    Long notificationId = 1L;

    when(notificationRepository.findById(notificationId)).thenReturn(Optional.of(new Notification()));

    boolean result = notificationService.remove(notificationId);

    assertThat(result).isTrue();
    verify(notificationRepository).findById(notificationId);
    verify(notificationRepository).deleteById(notificationId);
  }

  @Test
  void testRemove_NotificationDoesNotExist() {
    Long notificationId = 1L;

    when(notificationRepository.findById(notificationId)).thenReturn(Optional.empty());

    boolean result = notificationService.remove(notificationId);

    assertThat(result).isFalse();
    verify(notificationRepository).findById(notificationId);
    verifyNoInteractions(notificationRepository);
  }

  @Test
  void testFindById() {
    Long id = 1L;
    Optional<Notification> optionalNotification = Optional.of(new Notification());

    when(notificationRepository.findById(id)).thenReturn(optionalNotification);

    Optional<Notification> result = notificationService.findById(id);

    assertThat(result).isEqualTo(optionalNotification);
    verify(notificationRepository).findById(id);
  }
}