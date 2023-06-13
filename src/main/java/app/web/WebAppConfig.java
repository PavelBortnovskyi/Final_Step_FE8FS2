package app.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebAppConfig implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/swagger-ui/**").addResourceLocations("classpath:/META-INF/resources/");
    registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
//    registry.addMapping("/chat-ws").allowedMethods("GET", "OPTIONS")
//      .allowedHeaders("*").allowedOrigins("http://localhost:3000", "https://final-step-fe-8-fs-2.vercel.app",
//        "http://localhost:3000/**", "https://final-step-fe-8-fs-2.vercel.app/**");
//
//    registry.addMapping("/chat-ws/**").allowedMethods("GET", "OPTIONS")
//      .allowedHeaders("*").allowedOrigins("http://localhost:3000", "https://final-step-fe-8-fs-2.vercel.app",
//        "http://localhost:3000/**", "https://final-step-fe-8-fs-2.vercel.app/**");
//
//    registry.addMapping("/notifications-ws").allowedMethods("GET", "OPTIONS")
//      .allowedHeaders("*").allowedOrigins("http://localhost:3000", "https://final-step-fe-8-fs-2.vercel.app",
//        "http://localhost:3000/**", "https://final-step-fe-8-fs-2.vercel.app/**");
//
//    registry.addMapping("/notifications-ws/**").allowedMethods("GET", "OPTIONS")
//      .allowedHeaders("*").allowedOrigins("http://localhost:3000", "https://final-step-fe-8-fs-2.vercel.app",
//        "http://localhost:3000/**", "https://final-step-fe-8-fs-2.vercel.app/**");

    registry.addMapping("/**")
      .allowedOrigins("*")
      .allowCredentials(false)
      .maxAge(3600)
      .allowedHeaders("Accept", "Content-Type", "Origin",
        "Authorization", "X-Auth-Token")
      .exposedHeaders("X-Auth-Token", "Authorization")
      .allowedMethods("POST", "GET", "DELETE", "PUT", "OPTIONS");
  }
}
