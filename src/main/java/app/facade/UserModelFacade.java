package app.facade;

import app.dto.rq.UserModelRequest;
import app.dto.rs.UserModelResponse;
import app.model.UserModel;
import lombok.NoArgsConstructor;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;

@NoArgsConstructor
public class UserModelFacade extends GeneralFacade<UserModel, UserModelRequest, UserModelResponse> {

  @Autowired
  private PasswordEncoder encoder;

  //private HashMap<String, TypeMap> styles = new HashMap<>();

  @PostConstruct
  public void init() {
//        super.getMm().typeMap(UserModel.class, UserModelResponse.class)
//                .addMapping(src -> src.getFollowers().size(), UserModelResponse::setCountUserFollowers)
//                .addMapping(src -> src.getFollowing().size(), UserModelResponse::setCountUserFollowings);
    TypeMap<UserModelRequest, UserModel> registrationType = super.getMm().createTypeMap(UserModelRequest.class, UserModel.class)
      .addMapping(UserModelRequest::getUserTag, UserModel::setUserTag)
      .addMapping(UserModelRequest::getFullName, UserModel::setFullName)
      .addMapping(UserModelRequest::getEmail, UserModel::setEmail)
      .addMapping(src -> encoder.encode(src.getPassword()), UserModel::setPassword);

    //this.styles.put("Registration", registrationType);
  }

  @Override
  public UserModel convertToEntity(UserModelRequest dto) {
    UserModel sample = new UserModel();
    TypeMap<UserModelRequest, UserModel> registrationType = super.getMm().createTypeMap(UserModelRequest.class, UserModel.class)
      .addMapping(UserModelRequest::getUserTag, UserModel::setUserTag)
      .addMapping(UserModelRequest::getFullName, UserModel::setFullName)
      .addMapping(UserModelRequest::getEmail, UserModel::setEmail)
      .addMapping(src -> encoder.encode(src.getPassword()), UserModel::setPassword);
    //dto.setPassword(this.encoder.encode(dto.getPassword()));
    super.getMm().map(dto, sample, "registrationType");
    return sample;
  }
}
