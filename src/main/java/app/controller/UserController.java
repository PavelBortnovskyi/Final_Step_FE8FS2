package app.controller;

import app.annotations.Marker;
import app.dto.rq.UserRequestDTO;
import app.dto.rs.UserResponseDTO;
import app.facade.UserFacade;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.util.Map;

@Log4j2
@Validated
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

  private final UserFacade userFacade;

  @GetMapping("{userId}")
  public ResponseEntity<UserResponseDTO> getUserById(@PathVariable(name = "userId") @Positive Long userId) {
    return ResponseEntity.ok(userFacade.getUserById(userId));
  }

  @GetMapping("profile")
  public ResponseEntity<UserResponseDTO> getUser(HttpServletRequest httpRequest) {
    return ResponseEntity.ok(userFacade.getUserById((Long) httpRequest.getAttribute("userId")));
  }

  @Validated({Marker.Update.class})
  @PutMapping("profile")
  public ResponseEntity<UserResponseDTO> updateUser(@RequestBody @JsonView({Marker.Update.class}) @Valid UserRequestDTO userRequestDTO,
                                                    HttpServletRequest httpRequest) {
    return ResponseEntity.ok(userFacade.updateUser((Long) httpRequest.getAttribute("userId"), userRequestDTO));
  }

  @PutMapping("profile/avatar_img")
  @ResponseStatus(HttpStatus.OK)
  public Map<String, String> uploadAvatarImg(@RequestParam("file") MultipartFile file,
                                             HttpServletRequest httpRequest) {
    return userFacade.uploadAvatarImg((Long) httpRequest.getAttribute("userId"), file);
  }

  @PutMapping("profile/header_img")
  @ResponseStatus(HttpStatus.OK)
  public Map<String, String> uploadHeaderImg(@RequestParam("file") MultipartFile file,
                                             HttpServletRequest httpRequest) {
    return userFacade.uploadHeaderImg((Long) httpRequest.getAttribute("userId"), file);
  }

  @PostMapping("subscribe/{userIdToFollowing}")
  public ResponseEntity<UserResponseDTO> subscribe(@PathVariable(name = "userIdToFollowing") @Positive Long userIdToFollowing,
                                                   HttpServletRequest httpRequest) {
    return ResponseEntity.ok(userFacade.subscribe((Long) httpRequest.getAttribute("userId"), userIdToFollowing));
  }

  @PostMapping("unsubscribe/{userIdToUnFollowing}")
  public ResponseEntity<UserResponseDTO> unsubscribe(@PathVariable(name = "userIdToUnFollowing") @Positive Long userIdToUnFollowing,
                                                     HttpServletRequest httpRequest) {
    return ResponseEntity.ok(userFacade.unsubscribe((Long) httpRequest.getAttribute("userId"), userIdToUnFollowing));
  }

  @GetMapping("profile/followers")
  @ResponseStatus(HttpStatus.OK)
  public Page<UserResponseDTO> getFollowers(@RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                            @RequestParam(name = "size", defaultValue = "10") @Positive int size,
                                            HttpServletRequest httpServletRequest) {
    return userFacade.getFollowers((Long) httpServletRequest.getAttribute("userId"), PageRequest.of(page, size));
  }

  @GetMapping("profile/followings")
  @ResponseStatus(HttpStatus.OK)
  public Page<UserResponseDTO> getFollowings(@RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                             @RequestParam(name = "size", defaultValue = "10") @Positive int size,
                                             HttpServletRequest httpServletRequest) {
    return userFacade.getFollowings((Long) httpServletRequest.getAttribute("userId"), PageRequest.of(page, size));
  }

  @GetMapping("{userId}/followers")
  @ResponseStatus(HttpStatus.OK)
  public Page<UserResponseDTO> getFollowers(@PathVariable(name = "userId") @Positive Long userId,
                                            @RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                            @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return userFacade.getFollowers(userId, PageRequest.of(page, size));
  }

  @GetMapping("{userId}/followings")
  @ResponseStatus(HttpStatus.OK)
  public Page<UserResponseDTO> getFollowingsByUserId(@PathVariable(name = "userId") @Positive Long userId,
                                                     @RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                                     @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return userFacade.getFollowings(userId, PageRequest.of(page, size));
  }

  @GetMapping("offer_followings")
  @ResponseStatus(HttpStatus.OK)
  public Page<UserResponseDTO> getOfferFollowings(@RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                                  @RequestParam(name = "size", defaultValue = "10") @Positive int size,
                                                  HttpServletRequest httpServletRequest) {
    return userFacade.getOfferFollowings((Long) httpServletRequest.getAttribute("userId"), PageRequest.of(page, size));
  }

  @GetMapping("search")
  @ResponseStatus(HttpStatus.OK)
  public Page<UserResponseDTO> findUser(@RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                        @RequestParam(name = "size", defaultValue = "10") @Positive int size,
                                        @RequestParam(name = "search_string", defaultValue = "") String serchString,
                                        HttpServletRequest httpServletRequest) {
    return userFacade.findUser((Long) httpServletRequest.getAttribute("userId"), serchString, PageRequest.of(page, size));
  }
}
