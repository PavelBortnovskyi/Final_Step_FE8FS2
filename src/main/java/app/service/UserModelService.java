package app.service;

import app.exceptions.userError.IncorrectUserIdException;
import app.exceptions.userError.UserNotFoundException;
import app.model.UserModel;
import app.repository.UserModelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserModelService extends GeneralService<UserModel> {

  private final UserModelRepository userModelRepository;

  private final PasswordEncoder encoder;


  /**
   * Methods returns Optional of UserModel by different parameters
   */
  public Optional<UserModel> getUserO(String email) {
    return this.userModelRepository.findByEmail(email);
  }

  public Optional<UserModel> getUserO(Long id) {
    return this.userModelRepository.findById(id);
  }


  public UserModel getUser(String email) {
    return this.userModelRepository.findByEmail(email)
      .orElseThrow(() -> new UserNotFoundException(email));
  }

  public UserModel getUser(Long userId) {
    return this.userModelRepository.findById(userId)
      .orElseThrow(() -> new UserNotFoundException(userId));
  }


  public Optional<UserModel> getUserByToken(String refreshToken) {
    return this.userModelRepository.findByToken(refreshToken);
  }

  public Optional<UserModel> getUserByTagO(String userTag) {
    return this.userModelRepository.findByUserTag(userTag);
  }


  @Transactional
  public void subscribe(Long userCurrentId, Long userToFollowingId) {
    if (userCurrentId.equals(userToFollowingId))
      throw new IncorrectUserIdException(userToFollowingId);
    getUser(userCurrentId).getFollowings().add(getUser(userToFollowingId));
  }


  @Transactional
  public void unsubscribe(Long userCurrentId, Long userToUnFollowingId) {
    getUser(userCurrentId).getFollowings().remove(getUser(userToUnFollowingId));
  }


  /**
   * Method returns boolean result of updating user password operation (after checking login&password combination) and updates it in case right combination
   */
  public boolean updatePassword(String email, String oldPassword, String freshPassword) {
    return this.userModelRepository.findByEmail(email).filter(user -> encoder.matches(oldPassword, user.getPassword()))
      .map(user -> {
        this.userModelRepository.updatePassword(user.getId(), freshPassword);
        return true;
      }).orElseGet(() -> false);
  }


  /**
   * Method returns boolean result of checking presence in DB user with login&password combination
   */
  public boolean checkLoginPassword(String email, String password) {
    return this.userModelRepository.findByEmail(email).filter(user -> encoder.matches(password, user.getPassword())).isPresent();
  }


  /**
   * Method returns true if provided email address is present in DB
   */
  public boolean isEmailPresentInDB(String email) {
    return this.userModelRepository.findByEmail(email).isPresent();
  }

  public boolean isUserTagPresentInDB(String userTag) {
    return this.getUserByTagO(userTag).isPresent();
  }

}
