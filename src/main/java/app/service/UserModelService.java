package app.service;

import app.model.UserModel;
import app.repository.UserModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

  public Optional<UserModel> getUser(Long id) { return this.userModelRepository.findById(id); }

  public Optional<UserModel> getUserByToken(String refreshToken) {
    return this.userModelRepository.findByToken(refreshToken);
  }

  /**
   * Method returns true if provided email address is present in DB
   */
  public boolean checkEmail(String email) {
    return this.userModelRepository.findByEmail(email).isPresent();
  }
}
