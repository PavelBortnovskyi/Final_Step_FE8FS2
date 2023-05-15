package app.controller;

import app.dto.rs.UserResponseDTO;
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
//@RequestMapping("/user")
public class UserController {

  private final UserModelService userModelService;

//  @GetMapping("/user/{userId}")
//  public ResponseEntity<UserResponseDTO> getUserById(@PathVariable(name = "userId") Long userId){
//    Optional<UserModel> userModel = userModelService.getUser(userId);
//    return userModel.map(model -> ResponseEntity.ok(userFacade.convertToDto(model)))
//                    .orElseGet(() -> ResponseEntity.notFound().build());
//  }
//
//  @GetMapping("/user")
//  public ResponseEntity<UserResponseDTO> getUser(HttpServletRequest httpRequest){
//    Long id = (Long) httpRequest.getAttribute("userId");
//    Optional<UserModel> userModel = userModelService.getUser(id);
////    return userModel.map(model -> ResponseEntity.ok(userFacade.convertToDto(model)))
//      .orElseGet(() -> ResponseEntity.notFound().build());
//  }


}
