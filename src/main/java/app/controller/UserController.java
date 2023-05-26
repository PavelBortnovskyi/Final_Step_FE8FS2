package app.controller;

import app.annotations.Marker;
import app.dto.rq.UserModelRequest;
import app.dto.rs.UserModelResponse;
import app.facade.UserModelFacade;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Log4j2
@Validated
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

  private final UserModelFacade userModelFacade;

  @GetMapping("{userId}")
  public ResponseEntity<UserModelResponse> getUserById(@PathVariable(name = "userId") @Positive Long userId) {
    return ResponseEntity.ok(userModelFacade.getUserById(userId));
  }

  @GetMapping("profile")
  public ResponseEntity<UserModelResponse> getUser(HttpServletRequest httpRequest) {
    return ResponseEntity.ok(userModelFacade.getUserById((Long) httpRequest.getAttribute("userId")));
  }

  @Validated({Marker.Update.class})
  @PutMapping("profile")
  public ResponseEntity<UserModelResponse> updateUser(@RequestBody @JsonView({Marker.Update.class}) @Valid UserModelRequest userRequestDTO,
                                                      HttpServletRequest httpRequest) {
    return ResponseEntity.ok(userModelFacade.updateUser((Long) httpRequest.getAttribute("userId"), userRequestDTO));
  }

  @PutMapping("profile/avatar_img")
  public ResponseEntity<UserModelResponse> uploadAvatarImg(@RequestParam("file") MultipartFile file,
                                                           HttpServletRequest httpRequest) {
    return ResponseEntity.ok(userModelFacade.uploadAvatarImg((Long) httpRequest.getAttribute("userId"), file));
  }

  @PutMapping("profile/header_img")
  public ResponseEntity<UserModelResponse> uploadHeaderImg(@RequestParam("file") MultipartFile file,
                                                           HttpServletRequest httpRequest) {
    return ResponseEntity.ok(userModelFacade.uploadHeaderImg((Long) httpRequest.getAttribute("userId"), file));
  }

  @PostMapping("subscribe/{userIdToFollowing}")
  public ResponseEntity<UserModelResponse> subscribe(@PathVariable(name = "userIdToFollowing") @Positive Long userIdToFollowing,
                                                     HttpServletRequest httpRequest) {
    return ResponseEntity.ok(userModelFacade.subscribe((Long) httpRequest.getAttribute("userId"), userIdToFollowing));
  }

  @PostMapping("unsubscribe/{userIdToUnFollowing}")
  public ResponseEntity<UserModelResponse> unsubscribe(@PathVariable(name = "userIdToUnFollowing") @Positive Long userIdToUnFollowing,
                                                       HttpServletRequest httpRequest) {
    return ResponseEntity.ok(userModelFacade.unsubscribe((Long) httpRequest.getAttribute("userId"), userIdToUnFollowing));
  }

  @GetMapping("followers")
  public Page<UserModelResponse> getFollowers(@RequestParam(name = "page", defaultValue = "0") int page,
                                              @RequestParam(name = "size", defaultValue = "10") int size,
                                              HttpServletRequest httpServletRequest) {
    return userModelFacade.getFollowers((Long) httpServletRequest.getAttribute("userId"), page, size);
  }

  @GetMapping("followings")
  public Page<UserModelResponse> getFollowings(@RequestParam(name = "page", defaultValue = "0") int page,
                                               @RequestParam(name = "size", defaultValue = "10") int size,
                                               HttpServletRequest httpServletRequest) {
    return userModelFacade.getFollowings((Long) httpServletRequest.getAttribute("userId"), page, size);
  }

  @GetMapping("offer_followings")
  public Page<UserModelResponse> getOfferFollowings(@RequestParam(name = "page", defaultValue = "0") int page,
                                                    @RequestParam(name = "size", defaultValue = "10") int size,
                                                    HttpServletRequest httpServletRequest) {
    return userModelFacade.getOfferFollowings((Long) httpServletRequest.getAttribute("userId"), page, size);
  }

  @GetMapping("search")
  public Page<UserModelResponse> findUser(@RequestParam(name = "page", defaultValue = "0") int page,
                                          @RequestParam(name = "size", defaultValue = "10") int size,
                                          @RequestParam(name = "part_of_full_name", defaultValue = "") String partFullName,
                                          @RequestParam(name = "part_of_user_tag", defaultValue = "") String partUserTag,
                                          HttpServletRequest httpServletRequest) {
    return userModelFacade.findUser((Long) httpServletRequest.getAttribute("userId"), partFullName, partUserTag, page, size);
  }
}
