package app.facade;

import app.dto.rq.UserModelRequest;
import app.dto.rs.UserModelResponse;
import app.exceptions.authError.EmailAlreadyRegisteredException;
import app.model.UserModel;
import app.service.UserModelService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;

@NoArgsConstructor
public class UserModelFacade extends GeneralFacade<UserModel, UserModelRequest, UserModelResponse> {

  @Autowired
  private UserModelService userModelService;

  @PostConstruct
  public void init() {
    super.getMm().typeMap(UserModel.class, UserModelResponse.class)
      .addMapping(UserModel::getCountFollowers, UserModelResponse::setCountUserFollowers)
      .addMapping(UserModel::getCountFollowings, UserModelResponse::setCountUserFollowings);

    // Skip properties with null value
    super.getMm().getConfiguration().setPropertyCondition(u -> u.getSource() != null);
  }

  public UserModelResponse getUserById(Long userId) {
    return this.convertToDto(userModelService.getUser(userId));
  }

  public UserModelResponse updateUser(Long userId, UserModelRequest userModelRequest) {
    userModelService.getUserByTagO(userModelRequest.getUserTag())
      .ifPresent(u -> {
        if (!u.getId().equals(userId))
          throw new EmailAlreadyRegisteredException("tag: " + userModelRequest.getUserTag());
      });
    return this.save(this.mapToEntity(userModelRequest, userModelService.getUser(userId)));
  }

}
