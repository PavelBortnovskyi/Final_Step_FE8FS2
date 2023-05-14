package app.facade;

import app.dto.rq.UserModelRequest;
import app.dto.rs.UserModelResponse;
import app.model.UserModel;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;

@NoArgsConstructor
public class UserModelFacade extends GeneralFacade<UserModel, UserModelRequest, UserModelResponse> {

  @Autowired
  private PasswordEncoder encoder;

  @PostConstruct
  public void init() {
//        super.getMm().typeMap(UserModel.class, UserModelResponse.class)
//                .addMapping(src -> src.getFollowers().size(), UserModelResponse::setCountUserFollowers)
//                .addMapping(src -> src.getFollowing().size(), UserModelResponse::setCountUserFollowings);
  }

  @Override
  public UserModel convertToEntity(UserModelRequest dto) {
    UserModel sample = new UserModel();
    dto.setPassword(this.encoder.encode(dto.getPassword()));
    super.getMm().map(dto, sample);
    return sample;
  }
}
