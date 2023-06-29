package app.security;

import app.model.UserModel;
import app.service.EmailService;
import app.service.JwtTokenService;
import app.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.io.OutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static org.passay.AllowedCharacterRule.ERROR_CODE;

@Log4j2
@Component
@CrossOrigin(originPatterns = {"http://localhost", "https://final-step-fe-8-fs-2.vercel.app"})
@RequiredArgsConstructor
public class OAuth2SuccessLoginHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final JwtTokenService jwtTokenService;

  private final UserService userService;

  private final PasswordEncoder encoder;

  private final EmailService emailService;

  private final ObjectMapper objectMapper;

  public void onAuthenticationSuccess(HttpServletRequest request,
                                      HttpServletResponse response,
                                      Authentication authentication) throws IOException, ServletException {
    log.info("Processing OAuth2 user");
    OAuth2UserDetailsImpl oauth2User = (OAuth2UserDetailsImpl) authentication.getPrincipal();

    OutputStream outputStream = response.getOutputStream();
    HashMap<String, String> tokenResponse = new HashMap<>();

    //Extract email
    String email = oauth2User.getAttribute("email");
    //Extract OAuth2 provider id
    String registrationId = oauth2User.getOauth2ClientName();

    //Check presence in DB
    if (this.userService.isEmailPresentInDB(email))
      tokenResponse = this.jwtTokenService.generateTokenPair(this.userService.getUser(email));
    else {
      UserModel freshUser = new UserModel();

      freshUser.setEmail(email);
      freshUser.setFullName((String) oauth2User.getAttribute("name"));
      String tempPassword = this.generateRandomPassayPassword();
      freshUser.setPassword(encoder.encode(tempPassword));

      if ("Google".equals(registrationId)) {

        freshUser.setAvatarImgUrl((String) oauth2User.getAttribute("picture"));
        freshUser.setUserTag("@" + freshUser.getFullName());

      } else if ("Facebook".equals(registrationId)) {
        HashMap<String, Object> pictureObj = oauth2User.getAttribute("picture");
        Map<String, Object> dataOjb = (Map<String, Object>) pictureObj.get("data");
        freshUser.setAvatarImgUrl((String) dataOjb.get("url"));
        freshUser.setUserTag("@" + (String) oauth2User.getAttribute("first_name"));
        String birthday = (String) Objects.requireNonNull(oauth2User.getAttribute("birthday"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        freshUser.setBirthDate(LocalDate.parse(birthday, formatter));
      }
      this.emailService.sendEmail(email, "FE8FS2TW app", "Your temporary password: " + tempPassword + " please change it on your profile page");
      freshUser.setVerified(true);
      tokenResponse = this.jwtTokenService.generateTokenPair(this.userService.save(freshUser));
    }

    objectMapper.writeValue(outputStream, tokenResponse);
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    response.setStatus(200);
    outputStream.flush();
    outputStream.close();

    //response.sendRedirect("/signup_g");
    super.onAuthenticationSuccess(request, response, authentication);
  }

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
