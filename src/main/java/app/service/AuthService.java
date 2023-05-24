package app.service;

import app.dto.rq.UserModelRequest;
import app.enums.TokenType;
import app.exceptions.authError.AuthErrorException;
import app.exceptions.authError.UserAlreadyRegisteredException;
import app.facade.UserModelFacade;
import app.model.UserModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.HashMap;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class AuthService {

  private final JwtTokenService jwtTokenService;

  private final EmailService emailService;

  private final AuthenticationManager authenticationManager;

  private final UserModelFacade userFacade;

  private final UserModelService userService;

  private final PasswordEncoder encoder;

  public ResponseEntity<HashMap<String, String>> makeLogin(UserModelRequest loginDTO) {
    //Auth procedure handling
    Authentication authentication = authenticationManager
      .authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    Object principal = authentication.getPrincipal();

    Optional<User> maybeAuthUser = (principal instanceof User) ? Optional.of((User) principal) : Optional.empty();
    User authUser = maybeAuthUser.orElseThrow(() -> new AuthErrorException("Something went wrong during authentication"));

    //User extraction from DB by security credentials from Authenticated User (email aka username)
    Optional<UserModel> maybeCurrentUser = this.userService.getUserO(authUser.getUsername());
    UserModel currentUser = maybeCurrentUser.orElseThrow(() -> new AuthErrorException("Authenticated user not found in DB! MAGIC!"));

    //Token creation
    String accessToken = this.jwtTokenService.createToken(currentUser.getId(), TokenType.ACCESS, currentUser.getUserTag(), currentUser.getEmail());
    String refreshToken = this.jwtTokenService.createToken(currentUser.getId(), TokenType.REFRESH);

    //Update refresh token for current user
    this.jwtTokenService.updateRefreshToken(currentUser, refreshToken);

    //JWT tokens for response packing
    HashMap<String, String> response = new HashMap<>();
    response.put("ACCESS_TOKEN", accessToken);
    response.put("REFRESH_TOKEN", refreshToken);
    response.put("LOGIN_USER_ID", currentUser.getId().toString());
    return ResponseEntity.ok(response);
  }

  public ResponseEntity<HashMap<String, String>> makeSighUp(UserModelRequest signUpDTO) {
    //Email duplicate checking
    if (this.userService.isEmailPresentInDB(signUpDTO.getEmail()))
      throw new UserAlreadyRegisteredException("email: " + signUpDTO.getEmail());

    //Saving new User to DB and getting user_id to freshUser       //Mapping signUpDTO -> UserModel
    signUpDTO.setPassword(encoder.encode(signUpDTO.getPassword()));
    UserModel freshUser = this.userService.save(this.userFacade.convertToEntity(signUpDTO));

    //Token creation using user_id
    String accessToken = this.jwtTokenService.createToken(freshUser.getId(), TokenType.ACCESS, freshUser.getUserTag(), freshUser.getEmail());
    String refreshToken = this.jwtTokenService.createToken(freshUser.getId(), TokenType.REFRESH);

    //New user saving to DB with refresh token
    freshUser.setRefreshToken(refreshToken);

    //JWT tokens and UserId for response packing
    HashMap<String, String> response = new HashMap<>();
    response.put("ACCESS_TOKEN", accessToken);
    response.put("REFRESH_TOKEN", refreshToken);
    response.put("NEW_USER_ID", this.userService.save(freshUser).getId().toString());
    return ResponseEntity.ok(response);
  }

  public String makeLogOut(Long userId) {
    this.jwtTokenService.changeTokenStatus(userId, true);
    log.info("User id: " + userId + " logged out");
    return "User with Id: " + userId + " logged out";
  }

  public ResponseEntity<HashMap<String, String>> makePasswordUpdate(UserModelRequest passwordUpdateDto) {
    if (this.userService.updatePassword(passwordUpdateDto.getEmail(), passwordUpdateDto.getPassword(), passwordUpdateDto.getFreshPassword())) {
      return ResponseEntity.ok(new HashMap<>() {{
        put("MESSAGE", "Password for account: " + passwordUpdateDto.getEmail() + " was updated");
      }});
    } else return ResponseEntity.badRequest().body(new HashMap<>() {{
      put("ERROR", "Wrong login password combination");
    }});
  }

  public ResponseEntity<String> getPasswordResetToken(UserModelRequest passwordResetDto) {
    if (this.userService.isEmailPresentInDB(passwordResetDto.getEmail())) {
      String passwordResetToken = this.jwtTokenService.createToken(this.userService.getUserO(passwordResetDto.getEmail()).get().getId(), TokenType.PASSWORD_RESET);
      String resetUrl = "https://final-step-fe2fs8tw.herokuapp.com/api/v1/user/password/reset/apply?token=" + passwordResetToken;
      emailService.sendEmail(passwordResetDto.getEmail(), "Password Reset", "We have request to reset password on your FinalStepTW account if it was you please proceed to " + resetUrl);
      return ResponseEntity.ok("Was sent email to " + passwordResetDto.getEmail() + " with password reset link");
    } else
      return ResponseEntity.badRequest().body("ERROR: " + passwordResetDto.getEmail() + " is not registered in our DB");
  }
}
