package app.utils;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class StaticContent implements WebMvcConfigurer {

  private String[][] pageMappings = {
    // http   file (related to templates folder)
    {"login", "login"}
  };

  private String[][] staticMappings = {
    // http     real file location
    {"/css/**", "classpath:/static/css/"},
    {"/img/**", "classpath:/static/img/"}
  };

  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    Arrays.stream(pageMappings)
      .forEach(mapping ->
        registry.addViewController(mapping[0]).setStatusCode(HttpStatus.OK).setViewName(mapping[1])
      );
  }
}

