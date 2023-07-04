package app.controller;

import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin(originPatterns = {"http://localhost:3000", "https://final-step-fe-8-fs-2.vercel.app"})
@Controller
@RequestMapping(value = "/")
public class OAuthController {

  //http://localhost:8080/login
  @GetMapping("/login")
  private ModelAndView handleGetOAuth2Login() {
    return new ModelAndView("login");
  }


  //http://localhost:8080/oauth2/authorization/google
  //https://final-step-fe2fs8tw.herokuapp.com/oauth2/authorization/google

  @ApiOperation("Send request to Google to authenticate user")
  @GetMapping("/oauth2/authorization/google")
  private void handleGoogleOAuth() {
  }

  //https://final-step-fe2fs8tw.herokuapp.com/oauth2/authorization/facebook
  @ApiOperation("Send request to Facebook to authenticate user")
  @GetMapping("/oauth2/authorization/facebook")
  private void handleFBOAuth() {
  }
}
