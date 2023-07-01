package app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/")
public class OAuth2TestController {

  //http://localhost:8080/login
  @GetMapping("/login")
  private ModelAndView handleGetOAuth2Login() {
    return new ModelAndView("login");
  }

  @GetMapping("/oauth2/authorization/google")
  private void handleGoogleOAuth() {;
  }

  @GetMapping("/oauth2/authorization/facebook")
  private void handleFBOAuth() {;
  }

  @PostMapping("/oauth2/authorization/google")
  private void handleGoogleOAuth2() {;
  }

  @PostMapping("/oauth2/authorization/facebook")
  private void handleFBOAuth2() {;
  }
}
