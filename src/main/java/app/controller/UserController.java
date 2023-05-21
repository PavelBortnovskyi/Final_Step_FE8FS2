package app.controller;

import app.dto.rs.UserModelResponse;
import app.facade.UserModelFacade;
import app.service.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

  private final UserModelService userModelService;
  private final UserModelFacade userModelFacade;

  @GetMapping("{userId}")
  public ResponseEntity<UserModelResponse> getUserById(@PathVariable(name = "userId") Long userId) {
    return ResponseEntity.ok(userModelFacade.getUserById(userId));
  }

  @GetMapping("profile")
  public ResponseEntity<UserModelResponse> getUser(HttpServletRequest httpRequest) {
    return ResponseEntity.ok(userModelFacade.getUserById((Long) httpRequest.getAttribute("userId")));
  }

  @PostMapping("subscribe/{userIdToFollowing}")
  public ResponseEntity<Void> subscribe(@PathVariable(name = "userIdToFollowing") Long userIdToFollowing, HttpServletRequest httpRequest) {
    userModelService.subscribe((Long) httpRequest.getAttribute("userId"), userIdToFollowing);
    return ResponseEntity.ok().build();
  }

  @PostMapping("unsubscribe/{userIdToUnFollowing}")
  public ResponseEntity<Void> unsubscribe(@PathVariable(name = "userIdToUnFollowing") Long userIdToUnFollowing, HttpServletRequest httpRequest) {
    userModelService.unsubscribe((Long) httpRequest.getAttribute("userId"), userIdToUnFollowing);
    return ResponseEntity.ok().build();
  }


}
