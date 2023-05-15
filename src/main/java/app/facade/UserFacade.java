package app.facade;

import app.dto.rq.UserModelRequest;
import app.dto.rs.UserResponseDTO;
import app.model.UserModel;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;


@Component
public class UserFacade extends GeneralFacade<UserModel, UserModelRequest, UserResponseDTO> {

  @PostConstruct
  public void init() {
        super.getMm().typeMap(UserModel.class, UserResponseDTO.class)
                .addMapping(src -> src.getFollowers().size(), UserResponseDTO::setCountUserFollowers)
                .addMapping(src -> src.getFollowings().size(), UserResponseDTO::setCountUserFollowings);
  }



}
