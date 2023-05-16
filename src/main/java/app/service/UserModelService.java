package app.service;

import app.annotations.Existed;
import app.annotations.New;
import app.dto.rq.UserModelRequest;
import app.enums.TokenType;
import app.exceptions.AuthErrorException;
import app.exceptions.EmailAlreadyRegisteredException;
import app.facade.UserModelFacade;
import app.model.UserModel;
import app.repository.UserModelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.HashMap;
import java.util.Optional;
import java.util.Set;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserModelService extends GeneralService<UserModel> {

  private final UserModelRepository userModelRepository;

  /**
   * Methods returns Optional of UserModel by different parameters
   */
  public Optional<UserModel> getUser(String email) {
    return this.userModelRepository.findByEmail(email);
  }

  public Optional<UserModel> getUser(Long id) {
    return this.userModelRepository.findById(id);
  }

  public Optional<UserModel> getUserByToken(String refreshToken) {
    return this.userModelRepository.findByToken(refreshToken);
  }

  /**
   * Method returns true if provided email address is present in DB
   */
  public boolean checkEmail(String email) {
    return this.userModelRepository.findByEmail(email).isPresent();
  }
}
