package app.service;

import app.exceptions.authError.JwtAuthenticationException;
import app.exceptions.userError.IncorrectUserIdException;
import app.exceptions.userError.UserNotFoundException;
import app.model.UserModel;
import app.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserService extends GeneralService<UserModel> {

  private final UserRepository userRepository;
  private final PasswordEncoder encoder;
  private final CloudinaryService cloudinaryService;

  /**
   * Methods returns Optional of UserModel by different parameters
   */
  public Optional<UserModel> getUserO(String email) {
    return userRepository.findByEmail(email);
  }

  public Optional<UserModel> getUserO(Long id) {
    return userRepository.findById(id);
  }

  public UserModel getUser(String email) {
    return userRepository.findByEmail(email)
      .orElseThrow(() -> new UserNotFoundException(email));
  }

  public UserModel getUser(Long userId) {
    return userRepository.findById(userId)
      .orElseThrow(() -> new UserNotFoundException(userId));
  }

  public UserModel getUserByRefreshToken(String refreshToken) {
    return userRepository.findByRefreshToken(refreshToken).orElseThrow(() -> new JwtAuthenticationException("Wrong refresh token!"));
  }

  public Optional<UserModel> getUserByTagO(String userTag) {
    return userRepository.findByUserTag(userTag);
  }

  @Transactional
  public UserModel subscribe(Long userCurrentId, Long userToFollowingId) {
    if (userCurrentId.equals(userToFollowingId))
      throw new IncorrectUserIdException(userToFollowingId);
    UserModel userModel = getUser(userCurrentId);
    userModel.getFollowings().add(getUser(userToFollowingId));
    return userModel;
  }

  @Transactional
  public UserModel unsubscribe(Long userCurrentId, Long userToUnFollowingId) {
    UserModel userModel = getUser(userCurrentId);
    userModel.getFollowings().remove(getUser(userToUnFollowingId));
    return userModel;
  }

  @Transactional
  public UserModel uploadAvatarImg(Long userId, MultipartFile file) {
    UserModel userModel = getUser(userId);
    userModel.setAvatarImgUrl(cloudinaryService.uploadFile(file, userId + "_avatar_img"));
    userRepository.save(userModel);
    return userModel;
  }

  @Transactional
  public UserModel uploadHeaderImg(Long userId, MultipartFile file) {
    UserModel userModel = getUser(userId);
    userModel.setHeaderImgUrl(cloudinaryService.uploadFile(file, userId + "_header_img"));
    userRepository.save(userModel);
    return userModel;
  }

  public Page<UserModel> getFollowers(Long userId, int page, int size) {
    return userRepository.findByFollowingsContains(getUser(userId), PageRequest.of(page, size));
  }

  public Page<UserModel> getFollowings(Long userId, int page, int size) {
    return userRepository.findByFollowersContains(getUser(userId), PageRequest.of(page, size));
  }

  public Page<UserModel> getOfferFollowings(Long userId, int page, int size) {
    return userRepository.findByIdNotAndFollowersNotContaining(userId, getUser(userId), PageRequest.of(page, size));
  }

  public Page<UserModel> searchUsers(Long userId, String searchString, int page, int size) {
    return userRepository.findByIdNotAndFullNameContainsIgnoreCaseOrUserTagContainsIgnoreCase(
      userId, searchString, searchString, PageRequest.of(page, size));
  }

  public boolean checkRefreshTokenStatus(String refreshToken) {
    return getUserByRefreshToken(refreshToken).isRefreshed();
  }

  @Transactional
  public void updateRefreshTokenById(Long userId, String refreshToken) {
    getUser(userId).setRefreshToken(refreshToken);
  }

  @Transactional
  public void changeRefreshTokenStatusById(Long userId, boolean usedStatus) {
    getUser(userId).setRefreshed(usedStatus);
  }

  @Transactional
  public void changeTokenStatusByValue(String token, boolean usedStatus) {
    getUserByRefreshToken(token).setRefreshed(usedStatus);
  }

  /**
   * Method returns boolean result of updating user password operation (after checking login&password combination) and updates it in case right combination
   */
  @Transactional
  public boolean updatePassword(String email, String oldPassword, String freshPassword) {
    UserModel userModel = getUser(email);
    if (!encoder.matches(oldPassword, userModel.getPassword())) return false;
    userModel.setPassword(freshPassword);
    return true;
  }

  /**
   * Method returns boolean result of updating user password operation (only for reset password case)
   */
  @Transactional
  public void updatePassword(Long userId, String freshPassword) {
    getUser(userId).setPassword(freshPassword);
  }

  /**
   * Method returns boolean result of checking presence in DB user with login&password combination
   */
  public boolean checkLoginPassword(String email, String password) {
    return encoder.matches(password, getUser(email).getPassword());
  }

  /**
   * Method returns true if provided email address is present in DB
   */
  public boolean isEmailPresentInDB(String email) {
    return userRepository.findByEmail(email).isPresent();
  }

  public boolean isUserTagPresentInDB(String userTag) {
    return getUserByTagO(userTag).isPresent();
  }
}
