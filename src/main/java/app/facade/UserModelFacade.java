package app.facade;

import app.dto.rq.UserModelRequest;
import app.dto.rs.UserModelResponse;
import app.exceptions.authError.UserAlreadyRegisteredException;
import app.model.UserModel;
import app.service.UserModelService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;

@Component
@NoArgsConstructor
public class UserModelFacade extends GeneralFacade<UserModel, UserModelRequest, UserModelResponse> {

  @Autowired
  private UserModelService userModelService;

  @PostConstruct
  public void init() {
    super.getMm().typeMap(UserModel.class, UserModelResponse.class)
      .addMapping(UserModel::getCountFollowers, UserModelResponse::setCountUserFollowers)
      .addMapping(UserModel::getCountFollowings, UserModelResponse::setCountUserFollowings)
      .addMapping(UserModel::getCountTweets, UserModelResponse::setCountUserTweets);
  }


  public UserModelResponse getUserById(Long userId) {
    return convertToDto(userModelService.getUser(userId));
  }


  public UserModelResponse updateUser(Long userId, UserModelRequest userModelRequest) {
    userModelService.getUserByTagO(userModelRequest.getUserTag())
      .ifPresent(u -> {
        if (!u.getId().equals(userId))
          throw new UserAlreadyRegisteredException("tag: " + userModelRequest.getUserTag());
      });
    return save(mapToEntity(userModelRequest, userModelService.getUser(userId)));
  }

  public UserModelResponse uploadAvatarImg(Long userId, MultipartFile file) {
    return convertToDto(userModelService.uploadAvatarImg(userId, file));
  }

  public UserModelResponse uploadHeaderImg(Long userId, MultipartFile file) {
    return convertToDto(userModelService.uploadHeaderImg(userId, file));
  }

  public UserModelResponse subscribe(Long userId, Long userIdToFollowing) {
    return convertToDto(userModelService.subscribe(userId, userIdToFollowing));
  }

  public UserModelResponse unsubscribe(Long userId, Long userIdToUnFollowing) {
    return convertToDto(userModelService.unsubscribe(userId, userIdToUnFollowing));
  }

  public Page<UserModelResponse> getFollowers(Long userId, int page, int size) {
    return userModelService.getFollowers(userId, page, size).map(this::convertToDto);
  }

  public Page<UserModelResponse> getFollowings(Long userId, int page, int size) {
    return userModelService.getFollowings(userId, page, size).map(this::convertToDto);
  }

  public Page<UserModelResponse> getOfferFollowings(Long userId, int page, int size) {
    return userModelService.getOfferFollowings(userId, page, size).map(this::convertToDto);
  }

  public Page<UserModelResponse> findUser(Long userId, String partFullName, String partUserTag, int page, int size) {
    return userModelService.searchUser(userId, partFullName, partUserTag, page, size).map(this::convertToDto);
  }
}
