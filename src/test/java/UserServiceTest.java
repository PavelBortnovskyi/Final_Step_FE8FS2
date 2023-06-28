import app.model.UserModel;
import app.repository.UserRepository;
import app.service.CloudinaryService;
import app.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {
  @Mock
  private UserRepository userRepository;

  @Mock
  private CloudinaryService cloudinaryService;

  @InjectMocks
  private UserService userService;

  @Mock
  private UserModel userModel;

  @Mock
  private PasswordEncoder encoder;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testGetUserOWithEmail() {
    String email = "test@example.com";
    UserModel userModel = new UserModel();
    userModel.setEmail(email);
    when(userRepository.findByEmail(email)).thenReturn(Optional.of(userModel));

    Optional<UserModel> result = userService.getUserO(email);

    assertThat(result).isPresent().contains(userModel);
    verify(userRepository).findByEmail(email);
  }

  @Test
  void testGetUserOWithId() {
    Long userId = 1L;
    UserModel userModel = new UserModel();
    when(userRepository.findById(userId)).thenReturn(Optional.of(userModel));

    Optional<UserModel> result = userService.getUserO(userId);

    assertThat(result).isPresent().contains(userModel);
    verify(userRepository).findById(userId);
  }

  @Test
  void testGetUserWithEmail() {
    String email = "test@example.com";
    UserModel userModel = new UserModel();
    when(userRepository.findByEmail(email)).thenReturn(Optional.of(userModel));

    UserModel result = userService.getUser(email);

    assertThat(result).isEqualTo(userModel);
    verify(userRepository).findByEmail(email);
  }

  @Test
  void testUnsubscribe() {
    Long userCurrentId = 1L;
    Long userToUnFollowingId = 2L;
    UserModel userCurrent = new UserModel();
    UserModel userToUnFollowing = new UserModel();
    userCurrent.getFollowings().add(userToUnFollowing);

    when(userRepository.findById(userCurrentId)).thenReturn(Optional.of(userCurrent));
    when(userRepository.findById(userToUnFollowingId)).thenReturn(Optional.of(userToUnFollowing));

    UserModel result = userService.unsubscribe(userCurrentId, userToUnFollowingId);

    assertThat(result).isEqualTo(userCurrent);
    assertThat(result.getFollowings()).doesNotContain(userToUnFollowing);
    verify(userRepository).findById(userCurrentId);
    verify(userRepository).findById(userToUnFollowingId);
  }

  @Test
  void testUploadAvatarImg() {
    Long userId = 1L;
    MultipartFile file = mock(MultipartFile.class);
    UserModel userModel = new UserModel();
    when(userRepository.findById(userId)).thenReturn(Optional.of(userModel));
    when(cloudinaryService.uploadUserAvatarImage(file, userId)).thenReturn("avatar-url");

    UserModel result = userService.uploadAvatarImg(userId, file);

    assertThat(result).isEqualTo(userModel);
    assertThat(result.getAvatarImgUrl()).isEqualTo("avatar-url");
    verify(userRepository).findById(userId);
    verify(cloudinaryService).uploadUserAvatarImage(file, userId);
  }

  @Test
  void testGetFollowers() {
    Long userId = 1L;
    Pageable pageable = mock(Pageable.class);
    UserModel user = new UserModel();
    when(userRepository.findById(userId)).thenReturn(Optional.of(user));
    when(userRepository.findByFollowingsContains(user, pageable)).thenReturn(mock(Page.class));

    Page<UserModel> result = userService.getFollowers(userId, pageable);

    assertThat(result).isNotNull();
    verify(userRepository).findById(userId);
    verify(userRepository).findByFollowingsContains(user, pageable);
  }

  @Test
  void testGetFollowings() {
    Long userId = 1L;
    Pageable pageable = mock(Pageable.class);
    UserModel user = new UserModel();
    when(userRepository.findById(userId)).thenReturn(Optional.of(user));
    when(userRepository.findByFollowersContains(user, pageable)).thenReturn(mock(Page.class));

    Page<UserModel> result = userService.getFollowings(userId, pageable);

    assertThat(result).isNotNull();
    verify(userRepository).findById(userId);
    verify(userRepository).findByFollowersContains(user, pageable);
  }

  @Test
  void testGetOfferFollowings() {
    Long userId = 1L;
    Pageable pageable = mock(Pageable.class);
    UserModel user = new UserModel();
    when(userRepository.findById(userId)).thenReturn(Optional.of(user));
    when(userRepository.findByIdNotAndFollowersNotContaining(userId, user, pageable)).thenReturn(mock(Page.class));

    Page<UserModel> result = userService.getOfferFollowings(userId, pageable);

    assertThat(result).isNotNull();
    verify(userRepository).findById(userId);
    verify(userRepository).findByIdNotAndFollowersNotContaining(userId, user, pageable);
  }

  @Test
  void testSearchUsers() {
    Long userId = 1L;
    String searchString = "John";
    Pageable pageable = mock(Pageable.class);
    UserModel user = new UserModel();
    when(userRepository.findByIdNotAndFullNameContainsIgnoreCaseOrUserTagContainsIgnoreCase(userId, searchString, searchString, pageable)).thenReturn(mock(Page.class));

    Page<UserModel> result = userService.searchUsers(userId, searchString, pageable);

    assertThat(result).isNotNull();
    verify(userRepository).findByIdNotAndFullNameContainsIgnoreCaseOrUserTagContainsIgnoreCase(userId, searchString, searchString, pageable);
  }

  @Test
  void testCheckRefreshTokenStatus() {
    String refreshToken = "refreshToken";
    UserModel userModel = new UserModel();
    userModel.setRefreshed(true);
    when(userRepository.findByRefreshToken(refreshToken)).thenReturn(Optional.of(userModel));

    boolean result = userService.checkRefreshTokenStatus(refreshToken);

    assertThat(result).isTrue();
    verify(userRepository).findByRefreshToken(refreshToken);
  }

  @Test
  void testUpdateRefreshTokenById() {
    Long userId = 1L;
    String refreshToken = "newRefreshToken";
    UserModel userModel = new UserModel();
    when(userRepository.findById(userId)).thenReturn(Optional.of(userModel));

    userService.updateRefreshTokenById(userId, refreshToken);

    assertThat(userModel.getRefreshToken()).isEqualTo(refreshToken);
    verify(userRepository).findById(userId);
  }

  @Test
  void testChangeRefreshTokenStatusById() {
    Long userId = 1L;
    boolean usedStatus = true;
    UserModel userModel = new UserModel();
    when(userRepository.findById(userId)).thenReturn(Optional.of(userModel));

    userService.changeRefreshTokenStatusById(userId, usedStatus);

    assertThat(userModel.isRefreshed()).isEqualTo(usedStatus);
    verify(userRepository).findById(userId);
  }

  @Test
  void testChangeTokenStatusByValue() {
    String token = "token";
    boolean usedStatus = true;
    UserModel userModel = new UserModel();
    when(userRepository.findByRefreshToken(token)).thenReturn(Optional.of(userModel));

    userService.changeTokenStatusByValue(token, usedStatus);

    assertThat(userModel.isRefreshed()).isEqualTo(usedStatus);
    verify(userRepository).findByRefreshToken(token);
  }

  @Test
  void testUpdatePassword_InvalidOldPassword() {
    String email = "john@example.com";
    String oldPassword = "oldPassword";
    String freshPassword = "freshPassword";
    when(userRepository.findByEmail(email)).thenReturn(Optional.of(userModel));
    when(encoder.matches(oldPassword, userModel.getPassword())).thenReturn(false);

    boolean result = userService.updatePassword(email, oldPassword, freshPassword);

    assertThat(result).isFalse();
    assertThat(userModel.getPassword()).isNotEqualTo(freshPassword);
    verify(userRepository).findByEmail(email);
    verify(encoder).matches(oldPassword, userModel.getPassword());
  }

  @Test
  void testUpdatePassword_InvalidEmail() {
    String email = "john@example.com";
    String oldPassword = "oldPassword";
    String freshPassword = "freshPassword";
    UserModel user = new UserModel();
    user.setEmail(email);
    userRepository.save(user);
    when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

    boolean result = userService.updatePassword(email, oldPassword, freshPassword);

    assertThat(result).isFalse();
    verify(userRepository).findByEmail(email);
  }

  @Test
  void testUpdatePasswordById() {
    Long userId = 1L;
    String freshPassword = "freshPassword";
    UserModel userModel = new UserModel();
    when(userRepository.findById(userId)).thenReturn(Optional.of(userModel));

    userService.updatePassword(userId, freshPassword);

    assertThat(userModel.getPassword()).isEqualTo(freshPassword);
    verify(userRepository).findById(userId);
  }

  @Test
  void testCheckLoginPassword() {
    String email = "john@example.com";
    String password = "password";
    String encodedPassword = "encodedPassword";
    when(userRepository.findByEmail(email)).thenReturn(Optional.of(userModel));
    when(userModel.getPassword()).thenReturn(encodedPassword);
    when(encoder.matches(password, encodedPassword)).thenReturn(true);

    boolean result = userService.checkLoginPassword(email, password);

    assertThat(result).isTrue();
    verify(userRepository).findByEmail(email);
    verify(userModel).getPassword();
    verify(encoder).matches(password, encodedPassword);
  }

  @Test
  void testCheckLoginPassword_InvalidEmail() {
    String email = "john@example.com";
    String password = "password";
    UserModel user = new UserModel();
    user.setEmail(email);
    userRepository.save(user);
    when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

    boolean result = userService.checkLoginPassword(email, password);

    assertThat(result).isFalse();
    verify(userRepository).findByEmail(email);
  }

  @Test
  void testCheckLoginPassword_InvalidPassword() {
    String email = "john@example.com";
    String password = "password";
    String encodedPassword = "encodedPassword";
    when(userRepository.findByEmail(email)).thenReturn(Optional.of(userModel));
    when(userModel.getPassword()).thenReturn(encodedPassword);
    when(encoder.matches(password, encodedPassword)).thenReturn(false);

    boolean result = userService.checkLoginPassword(email, password);

    assertThat(result).isFalse();
    verify(userRepository).findByEmail(email);
    verify(userModel).getPassword();
    verify(encoder).matches(password, encodedPassword);
  }

  @Test
  void testIsEmailPresentInDB() {
    String email = "john@example.com";
    when(userRepository.findByEmail(email)).thenReturn(Optional.of(userModel));

    boolean result = userService.isEmailPresentInDB(email);

    assertThat(result).isTrue();
    verify(userRepository).findByEmail(email);
  }

  @Test
  void testIsEmailPresentInDB_NotPresent() {
    String email = "john@example.com";
    when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

    boolean result = userService.isEmailPresentInDB(email);

    assertThat(result).isFalse();
    verify(userRepository).findByEmail(email);
  }

  @Test
  void testIsUserTagPresentInDB() {
    String userTag = "johndoe";
    when(userRepository.findByUserTag(userTag)).thenReturn(Optional.of(userModel));

    boolean result = userService.isUserTagPresentInDB(userTag);

    assertThat(result).isTrue();
    verify(userRepository).findByUserTag(userTag);
  }

  @Test
  void testIsUserTagPresentInDB_NotPresent() {
    String userTag = "johndoe";
    when(userRepository.findByUserTag(userTag)).thenReturn(Optional.empty());

    boolean result = userService.isUserTagPresentInDB(userTag);

    assertThat(result).isFalse();
    verify(userRepository).findByUserTag(userTag);
  }
}