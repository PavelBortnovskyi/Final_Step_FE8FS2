package app.security;

import app.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessLoginHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final UserService userService;

  public void onAuthenticationSuccess(HttpServletRequest request,
                                      HttpServletResponse response,
                                      Authentication authentication) throws IOException, ServletException {
    OAuth2UserDetailsImpl oauth2User = (OAuth2UserDetailsImpl) authentication.getPrincipal();

    OutputStream outputStream = response.getOutputStream();
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.writeValue(outputStream,userService.processOAuth2User(oauth2User).getBody());
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    response.setStatus(200);
    outputStream.flush();
    outputStream.close();

    //response.sendRedirect("/signup_g");
    super.onAuthenticationSuccess(request, response, authentication);
  }
}
