package app.controller;

import app.annotations.Marker;
import app.dto.rq.UserModelRequest;
import app.dto.rs.UserModelResponse;
import app.facade.UserModelFacade;
import app.service.UserModelService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

  private final UserModelService userModelService;
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
  public ResponseEntity<UserModelResponse> updateUser(@RequestBody @JsonView({Marker.Update.class}) @Valid UserModelRequest userRequestDTO, HttpServletRequest httpRequest) {
    return ResponseEntity.ok(userModelFacade.updateUser((Long) httpRequest.getAttribute("userId"), userRequestDTO));
  }


  @PostMapping("subscribe/{userIdToFollowing}")
  public ResponseEntity<Void> subscribe(@PathVariable(name = "userIdToFollowing") @Positive Long userIdToFollowing, HttpServletRequest httpRequest) {
    userModelService.subscribe((Long) httpRequest.getAttribute("userId"), userIdToFollowing);
    return ResponseEntity.ok().build();
  }

  @PostMapping("unsubscribe/{userIdToUnFollowing}")
  public ResponseEntity<Void> unsubscribe(@PathVariable(name = "userIdToUnFollowing") @Positive Long userIdToUnFollowing, HttpServletRequest httpRequest) {
    userModelService.unsubscribe((Long) httpRequest.getAttribute("userId"), userIdToUnFollowing);
    return ResponseEntity.ok().build();
  }

}
