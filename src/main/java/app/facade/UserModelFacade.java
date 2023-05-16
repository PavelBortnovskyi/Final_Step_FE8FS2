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
  }
}
