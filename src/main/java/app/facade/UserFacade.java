package app.facade;

import app.dto.rq.UserRequestDTO;
import app.dto.rs.UserResponseDTO;
import app.exceptions.authError.UserAlreadyRegisteredException;
import app.model.UserModel;
import app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class UserFacade extends GeneralFacade<UserModel, UserRequestDTO, UserResponseDTO> {

  private final UserService userService;


  @PostConstruct
  public void init() {
    super.getMm().typeMap(UserModel.class, UserResponseDTO.class)
      .addMapping(UserModel::getCountFollowers, UserResponseDTO::setCountUserFollowers)
      .addMapping(UserModel::getCountFollowings, UserResponseDTO::setCountUserFollowings)
      .addMapping(UserModel::getCountTweets, UserResponseDTO::setCountUserTweets);
  }


  public UserResponseDTO getUserById(Long userId) {
    return convertToDto(userService.getUser(userId));
  }


  public UserResponseDTO updateUser(Long userId, UserRequestDTO userRequestDTO) {
    userService.getUserByTagO(userRequestDTO.getUserTag())
      .ifPresent(u -> {
        if (!u.getId().equals(userId))
          throw new UserAlreadyRegisteredException("tag: " + userRequestDTO.getUserTag());
      });
    return save(mapToEntity(userRequestDTO, userService.getUser(userId)));
  }


  public Map<String, String> uploadAvatarImg(Long userId, MultipartFile file) {
    return new HashMap<>() {{
      put("avatar_url", userService.uploadAvatarImg(userId, file).getAvatarImgUrl());
    }};
  }


  public Map<String, String> uploadHeaderImg(Long userId, MultipartFile file) {
    return new HashMap<>() {{
      put("header_url", userService.uploadHeaderImg(userId, file).getHeaderImgUrl());
    }};
  }


  public UserResponseDTO subscribe(Long userId, Long userIdToFollowing) {
    return convertToDto(userService.subscribe(userId, userIdToFollowing));
  }


  public UserResponseDTO unsubscribe(Long userId, Long userIdToUnFollowing) {
    return convertToDto(userService.unsubscribe(userId, userIdToUnFollowing));
  }


  public Page<UserResponseDTO> getFollowers(Long userId, Pageable pageable) {
    return userService.getFollowers(userId, pageable).map(this::convertToDto);
  }


  public Page<UserResponseDTO> getFollowings(Long userId, Pageable pageable) {
    return userService.getFollowings(userId, pageable).map(this::convertToDto);
  }


  public Page<UserResponseDTO> getOfferFollowings(Long userId, Pageable pageable) {
    return userService.getOfferFollowings(userId, pageable).map(this::convertToDto);
  }


  public Page<UserResponseDTO> findUser(Long userId, String searchString, Pageable pageable) {
    return userService.searchUsers(userId, searchString, pageable).map(this::convertToDto);
  }
}
