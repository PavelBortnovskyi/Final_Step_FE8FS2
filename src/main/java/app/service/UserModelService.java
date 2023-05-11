package app.service;

import app.model.UserModel;
import app.repository.UserModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserModelService extends GeneralService<UserModel> {

  private final UserModelRepository userModelRepository;

  /**
   * Method returns Optional of UserModel by email as parameter
   */
  public Optional<UserModel> getUserByEmail(String email) {
    return this.userModelRepository.findByEmail(email);
  }

  /**
   * Method returns true if provided User Model is exist in DB and refreshToken updated
   */
  public boolean updateRefreshToken(UserModel userModel, String refreshToken) {
    if (this.userModelRepository.existsById(userModel.getId())) {
      this.userModelRepository.updateRefreshToken(userModel.getId(), refreshToken);
      return true;
    } else return false;
  }

  /**
   * Method returns true if provided email address is present in DB
   */
  public boolean checkEmail(String email) {
    return this.userModelRepository.findByEmail(email).isPresent();
  }
}
