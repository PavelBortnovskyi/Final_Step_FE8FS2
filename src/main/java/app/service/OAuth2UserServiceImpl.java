package app.service;

import app.enums.TokenType;
import app.exceptions.authError.UserAlreadyRegisteredException;
import app.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Objects;

@Service
public class OAuth2UserServiceImpl implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

  @Autowired
  private UserModelService userService;

  @Autowired
  private JwtTokenService jwtTokenService;

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
    OAuth2User oAuth2User = delegate.loadUser(userRequest);
    processOAuth2User(userRequest, oAuth2User);
    return oAuth2User;
  }

  private ResponseEntity<HashMap<String, String>> processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
    //Extract email
    String email = oAuth2User.getAttribute("email");
    //Extract OAuth provider id
    String registrationId = userRequest.getClientRegistration().getRegistrationId();
    //Check presence in DB
    if (this.userService.isEmailPresentInDB(email))
      throw new UserAlreadyRegisteredException("email: " + email);
    else {
      UserModel freshUser = new UserModel();
      freshUser.setEmail(email);
      freshUser.setFullName((String) oAuth2User.getAttribute("name"));
      if ("google".equals(registrationId)) {
        freshUser.setAvatarImgUrl((String) oAuth2User.getAttribute("picture"));
        freshUser.setUserTag("@" + (String) oAuth2User.getAttribute("name"));
      } else if ("facebook".equals(registrationId)) {
        freshUser.setUserTag("@" + (String) oAuth2User.getAttribute("first_name"));
        freshUser.setBirthDate(LocalDate.parse((String) Objects.requireNonNull(oAuth2User.getAttribute("birthday"))));
      }
      freshUser.setVerified(true);
      freshUser = userService.save(freshUser);
      Long id = freshUser.getId();

      String accessToken = this.jwtTokenService.createToken(id, TokenType.ACCESS, freshUser.getUserTag(), freshUser.getEmail());
      String refreshToken = this.jwtTokenService.createToken(id, TokenType.REFRESH);

      //Update refresh token for current user
      this.jwtTokenService.updateRefreshToken(freshUser, refreshToken);

      //JWT tokens for response packing
      HashMap<String, String> response = new HashMap<>();
      response.put("ACCESS_TOKEN", accessToken);
      response.put("REFRESH_TOKEN", refreshToken);
      response.put("USER_ID", id.toString());
      return ResponseEntity.ok(response);
    }
  }
}

