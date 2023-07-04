package app.security;

import app.model.UserModel;
import app.service.EmailService;
import app.service.JwtTokenService;
import app.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.passay.CharacterData;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static org.passay.AllowedCharacterRule.ERROR_CODE;

@Log4j2
@Component
@RequiredArgsConstructor
@CrossOrigin(originPatterns = {"http://localhost:3000", "https://final-step-fe-8-fs-2.vercel.app"})
public class OAuth2SuccessLoginHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final JwtTokenService jwtTokenService;

  private final UserService userService;

  private final PasswordEncoder encoder;

  private final EmailService emailService;

  public void onAuthenticationSuccess(HttpServletRequest request,
                                      HttpServletResponse response,
                                      Authentication authentication) throws IOException, ServletException {
    log.info("Processing OAuth2 user");

    //Extract user from security context
    OAuth2UserDetailsImpl oauth2User = (OAuth2UserDetailsImpl) authentication.getPrincipal();
    HashMap<String, String> tokenResponse = new HashMap<>();

    //Extract email
    String email = oauth2User.getAttribute("email");
    //Extract OAuth2 provider id
    String registrationId = oauth2User.getOauth2ClientName();

    //Check presence in DB
    if (userService.isEmailPresentInDB(email)) {
      tokenResponse = jwtTokenService.generateTokenPair(userService.getUser(email));
      //Process newUser registration
    } else {
      UserModel freshUser = new UserModel();
      freshUser.setEmail(email);
      //Extract and set name
      freshUser.setFullName((String) oauth2User.getAttribute("name"));
      //Generate and set random temp password with send email to user
      String tempPassword = this.generateRandomPassayPassword();
      freshUser.setPassword(encoder.encode(tempPassword));
      emailService.sendEmail(email, "FE8FS2TW app", "Your temporary password: " + tempPassword + " please change it on your profile page");

      //Processing new User depend from provider
      if ("Google".equals(registrationId)) {
        //Extract and set user pic
        freshUser.setAvatarImgUrl((String) oauth2User.getAttribute("picture"));
        //Extract and set user tag as full name
        freshUser.setUserTag("@" + freshUser.getFullName());
      } else if ("Facebook".equals(registrationId)) {
        //Extract and set user pic
        HashMap<String, Object> pictureObj = oauth2User.getAttribute("picture");
        Map<String, Object> dataOjb = (Map<String, Object>) pictureObj.get("data");
        freshUser.setAvatarImgUrl((String) dataOjb.get("url"));
        //Extract and set user tag as first name
        freshUser.setUserTag("@" + (String) oauth2User.getAttribute("first_name"));
        //Extract and set user birthdate
        String birthday = (String) Objects.requireNonNull(oauth2User.getAttribute("birthday"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        freshUser.setBirthDate(LocalDate.parse(birthday, formatter));
      }
      freshUser.setVerified(true);
      //Generating new token pair and save user to DB
      tokenResponse = jwtTokenService.generateTokenPair(userService.save(freshUser));
    }

    //Assemble redirect url with tokens as params
    String oauthUrl = String.format("https://final-step-fe-8-fs-2.vercel.app/social-login?accessToken=%s&refreshToken=%s",
      tokenResponse.get("ACCESS_TOKEN"), tokenResponse.get("REFRESH_TOKEN"));

    //Send redirect to frontend
    response.sendRedirect(oauthUrl);
    super.onAuthenticationSuccess(request, response, authentication);
  }

  /**
   * Method for random password generation by Passay library
   */
  public String generateRandomPassayPassword() {
    PasswordGenerator gen = new PasswordGenerator();
    CharacterData lowerCaseChars = EnglishCharacterData.LowerCase;
    CharacterRule lowerCaseRule = new CharacterRule(lowerCaseChars);
    lowerCaseRule.setNumberOfCharacters(2);

    CharacterData upperCaseChars = EnglishCharacterData.UpperCase;
    CharacterRule upperCaseRule = new CharacterRule(upperCaseChars);
    upperCaseRule.setNumberOfCharacters(2);

    CharacterData digitChars = EnglishCharacterData.Digit;
    CharacterRule digitRule = new CharacterRule(digitChars);
    digitRule.setNumberOfCharacters(2);

    CharacterData specialChars = new CharacterData() {
      public String getErrorCode() {
        return ERROR_CODE;
      }

      public String getCharacters() {
        return "!@#$%^&*()_+";
      }
    };
    CharacterRule splCharRule = new CharacterRule(specialChars);
    splCharRule.setNumberOfCharacters(2);

    String password = gen.generatePassword(10, splCharRule, lowerCaseRule,
      upperCaseRule, digitRule);
    return password;
  }
}
