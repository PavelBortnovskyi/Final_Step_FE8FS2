package app.controller;

import app.dto.rs.UserModelResponse;
import app.dto.rs.UserResponseDTO;
import app.facade.UserModelFacade;
import app.model.UserModel;
import app.service.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("user")
public class UserController {

  private final UserModelService userModelService;
  private final UserModelFacade userModelFacade;

  @GetMapping("{userId}")
  public ResponseEntity<UserModelResponse> getUserById(@PathVariable(name = "userId") Long userId){
    Optional<UserModel> userModel = userModelService.getUser(userId);
    return userModel.map(model -> ResponseEntity.ok(userModelFacade.convertToDto(model)))
                    .orElseGet(() -> ResponseEntity.notFound().build());
  }


  @GetMapping("profile")
  public ResponseEntity<UserModelResponse> getUser(HttpServletRequest httpRequest){
    Long id = (Long) httpRequest.getAttribute("userId");
    Optional<UserModel> userModel = userModelService.getUser(id);
    return userModel.map(model -> ResponseEntity.ok(userModelFacade.convertToDto(model)))
      .orElseGet(() -> ResponseEntity.notFound().build());
  }


}
