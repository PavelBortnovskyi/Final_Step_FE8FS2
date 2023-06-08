package app.facade;

import app.dto.rq.UserModelRequest;
import app.enums.TokenType;
import app.exceptions.authError.AuthErrorException;
import app.exceptions.authError.JwtAuthenticationException;
import app.exceptions.authError.UserAlreadyRegisteredException;
import app.exceptions.userError.UserNotFoundException;
import app.model.UserModel;
import app.service.EmailService;
import app.service.JwtTokenService;
import app.service.UserModelService;
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

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class AuthFacade {

  private final JwtTokenService jwtTokenService;

  private final EmailService emailService;

  private final AuthenticationManager authenticationManager;

  private final UserModelFacade userFacade;

  private final UserModelService userService;

  private final PasswordEncoder encoder;

  /**
   * Method performs user login operation based on provided in DTO credentials and returns new token pair
   */

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

    return ResponseEntity.ok(this.generateTokenPair(currentUser));
  }

  /**
   * Method performs user sighUp operation based on provided in DTO credentials and returns new token pair
   */
  public ResponseEntity<HashMap<String, String>> makeSighUp(UserModelRequest signUpDTO) {
    //Email duplicate checking
    if (this.userService.isEmailPresentInDB(signUpDTO.getEmail()))
      throw new UserAlreadyRegisteredException("email: " + signUpDTO.getEmail());

    //Tag duplicate checking
    if (this.userService.isUserTagPresentInDB(signUpDTO.getUserTag()))
      throw new UserAlreadyRegisteredException("tag: " + signUpDTO.getUserTag());

    //Saving new User to DB and getting user_id to freshUser       //Mapping signUpDTO -> UserModel
    signUpDTO.setPassword(encoder.encode(signUpDTO.getPassword()));
    UserModel freshUser = this.userService.save(this.userFacade.convertToEntity(signUpDTO));

    return ResponseEntity.ok(this.generateTokenPair(freshUser));
  }

  /**
   * Method performs user logout by refresh token invalidation
   */
  public String makeLogOut(Long userId) {
    this.jwtTokenService.changeRefreshTokenStatus(userId, true);
    log.info("User id: " + userId + " logged out");
    return "User with Id: " + userId + " logged out";
  }

  /**
   * Method performs user password update operation with email-old password combination checking
   */
  public ResponseEntity<HashMap<String, String>> makePasswordUpdate(UserModelRequest passwordUpdateDto) {
    if (this.userService.updatePassword(passwordUpdateDto.getEmail(), passwordUpdateDto.getPassword(), passwordUpdateDto.getFreshPassword())) {
      return ResponseEntity.ok(new HashMap<>() {{
        put("MESSAGE", "Password for account: " + passwordUpdateDto.getEmail() + " was updated");
      }});
    } else return ResponseEntity.badRequest().body(new HashMap<>() {{
      put("ERROR", "Wrong login password combination");
    }});
  }

  /**
   * Method send link with password reset token to user email
   */
  public ResponseEntity<String> sendPasswordResetTokenToEmail(UserModelRequest passwordResetDto) {
    if (this.userService.isEmailPresentInDB(passwordResetDto.getEmail())) {
      String passwordResetToken = this.jwtTokenService.createToken(this.userService.getUserO(passwordResetDto.getEmail()).get().getId(), TokenType.PASSWORD_RESET);
      //TODO: change link according to front end mapping
      String resetUrl = "https://final-step-fe2fs8tw.herokuapp.com/api/v1/user/password/reset/apply?token=" + passwordResetToken;
      emailService.sendEmail(passwordResetDto.getEmail(), "Password Reset", "We have request to reset password on your FinalStepTW account if it was you please proceed to " + resetUrl);
      return ResponseEntity.ok("Was sent email to " + passwordResetDto.getEmail() + " with password reset link");
    } else
      return ResponseEntity.badRequest().body("ERROR: " + passwordResetDto.getEmail() + " is not registered in our DB");
  }

  /**
   * Method performs user password reset and update with validating reset token in request
   */
  public ResponseEntity<HashMap<String, String>> makePasswordReset(UserModelRequest passwordResetDto, HttpServletRequest request) {
    String resetPasswordToken = this.jwtTokenService.extractTokenFromRequest(request).orElseThrow(() -> new JwtAuthenticationException(" Please provide token for reset password!"));
    if (this.jwtTokenService.validateToken(resetPasswordToken, TokenType.PASSWORD_RESET)) {

      Long userId = this.jwtTokenService.extractIdFromClaims(this.jwtTokenService.extractClaimsFromToken(resetPasswordToken, TokenType.PASSWORD_RESET).get()).get();
      this.userService.updatePassword(userId, passwordResetDto.getFreshPassword());
      UserModel currUser = this.userService.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));

      return ResponseEntity.ok(this.generateTokenPair(currUser));
    } else return ResponseEntity.badRequest().body(new HashMap<>() {{
      put("ERROR", "Token is not valid to reset password");
    }});
  }

  /**
   * Method send link with token pair to user email to verify email exist
   */
  public ResponseEntity<String> sendRegisterTokenToEmail(UserModelRequest signUpDTO) {
    if (this.userService.isEmailPresentInDB(signUpDTO.getEmail())) {
      return ResponseEntity.badRequest().body("ERROR: " + signUpDTO.getEmail() + " is already registered");
    } else {
      String registerToken = this.jwtTokenService.createToken(null, TokenType.REGISTER, "", signUpDTO.getEmail());
      //TODO: change link according to front end mapping
      String registerUrl = "https://final-step-fe2fs8tw.herokuapp.com/api/v1/auth/register/apply?token=" + registerToken;
      emailService.sendEmail(signUpDTO.getEmail(), "Verify your email for FinalStepTW account",
        "We need to verify your email for FinalStepTW account please proceed to " + registerUrl);
      return ResponseEntity.ok("Was sent email to " + signUpDTO.getEmail() + " with register token");
    }
  }

  public ResponseEntity<HashMap<String, String>> makeRefresh(HttpServletRequest request) {
    String token = this.jwtTokenService.extractTokenFromRequest(request).orElseThrow(() -> new JwtAuthenticationException("Token not found!"));
    if (this.jwtTokenService.validateToken(token, TokenType.REFRESH) && !this.jwtTokenService.checkRefreshTokenStatus(token)) {
      UserModel currUser = this.userService.getUserByRefreshToken(token);
      return ResponseEntity.ok(generateTokenPair(currUser));
    } else return ResponseEntity.status(401).body(new HashMap<>());
  }

  /**
   * Method returns generated access and refresh token pair based on provided user model
   */
  public HashMap<String, String> generateTokenPair(UserModel user) {
    String accessToken = this.jwtTokenService.createToken(user.getId(), TokenType.ACCESS, user.getUserTag(), user.getEmail());
    String refreshToken = this.jwtTokenService.createToken(user.getId(), TokenType.REFRESH);

    //Update refresh token for current user
    this.jwtTokenService.updateRefreshToken(user, refreshToken);

    //JWT tokens for response packing
    HashMap<String, String> response = new HashMap<>();
    response.put("ACCESS_TOKEN", accessToken);
    response.put("REFRESH_TOKEN", refreshToken);
    response.put("USER_ID", user.getId().toString());
    return response;
  }
}

