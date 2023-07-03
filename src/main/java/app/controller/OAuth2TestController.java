package app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin(originPatterns = {"http://localhost:3000", "https://final-step-fe-8-fs-2.vercel.app"})
@Controller
@RequestMapping(value = "/")
public class OAuth2TestController {

  //http://localhost:8080/login
  @GetMapping("/login")
  private ModelAndView handleGetOAuth2Login() {
    return new ModelAndView("login");
  }


  //http://localhost:8080/oauth2/authorization/google
  //https://final-step-fe2fs8tw.herokuapp.com/oauth2/authorization/google
  @GetMapping("/oauth2/authorization/google")
  private void handleGoogleOAuth() {;
  }

  //https://final-step-fe2fs8tw.herokuapp.com/oauth2/authorization/facebook
  @GetMapping("/oauth2/authorization/facebook")
  private void handleFBOAuth() {;
  }
}
