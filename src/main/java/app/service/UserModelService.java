package app.service;

import app.exceptions.userError.IncorrectIdExceptionException;
import app.exceptions.userError.NotFoundExceptionException;
import app.model.UserModel;
import app.repository.UserModelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserModelService extends GeneralService<UserModel> {

  private final UserModelRepository userModelRepository;

  /**
   * Methods returns Optional of UserModel by different parameters
   */
  public Optional<UserModel> getUser(String email) {
    return this.userModelRepository.findByEmail(email);
  }

  public Optional<UserModel> getUser(Long id) {
    return this.userModelRepository.findById(id);
  }

  public Optional<UserModel> getUserByToken(String refreshToken) {
    return this.userModelRepository.findByToken(refreshToken);
  }

  @Transactional
  public void subscribe(Long userCurrentId, Long userToFollowingId) {
    if (userCurrentId.equals(userToFollowingId)) throw new IncorrectIdExceptionException(userToFollowingId);
    UserModel userCurrent = this.getUser(userCurrentId).orElseThrow(() -> new NotFoundExceptionException(userCurrentId));
    UserModel userToFollowing = this.getUser(userToFollowingId).orElseThrow(() -> new NotFoundExceptionException(userToFollowingId));
    userCurrent.getFollowings().add(userToFollowing);
  }

  @Transactional
  public void unsubscribe(Long userCurrentId, Long userToUnFollowingId) {
    UserModel userCurrent = this.getUser(userCurrentId).orElseThrow(() -> new NotFoundExceptionException(userCurrentId));
    UserModel userToUnFollowing = this.getUser(userToUnFollowingId).orElseThrow(() -> new NotFoundExceptionException(userToUnFollowingId));
    userCurrent.getFollowings().remove(userToUnFollowing);
  }


  /**
   * Method returns true if provided email address is present in DB
   */
  public boolean checkEmail(String email) {
    return this.userModelRepository.findByEmail(email).isPresent();
  }
}
