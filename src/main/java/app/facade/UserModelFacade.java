package app.facade;

import app.dto.rq.UserModelRequest;
import app.dto.rs.UserModelResponse;
import app.exceptions.userError.NotFoundExceptionException;
import app.model.UserModel;
import app.service.UserModelService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;

@NoArgsConstructor
public class UserModelFacade extends GeneralFacade<UserModel, UserModelRequest, UserModelResponse> {

  @Autowired
  private UserModelService ums;

  @PostConstruct
  public void init() {
    super.getMm().typeMap(UserModel.class, UserModelResponse.class)
      .addMapping(UserModel::getCountFollowers, UserModelResponse::setCountUserFollowers)
      .addMapping(UserModel::getCountFollowings, UserModelResponse::setCountUserFollowings);
  }

  public UserModelResponse getUserById(Long userId) {
    return ums.getUser(userId).map(this::convertToDto)
      .orElseThrow(() -> new NotFoundExceptionException(userId));
  }
}
