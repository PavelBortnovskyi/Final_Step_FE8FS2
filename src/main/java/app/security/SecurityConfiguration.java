package app.security;

import app.exceptions.FilterExceptionHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;


@Log4j2
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {

  private final JwtAuthFilter jwtAuthFilter;

  private final FilterExceptionHandler filterExceptionHandler;

  private final OAuth2UserServiceImpl oAuth2UserService;
  private final OAuth2SuccessLoginHandler oAuth2SuccessLoginHandler;

//  @Autowired
//  @Qualifier("delegatedAuthenticationEntryPoint")
//  AuthenticationEntryPoint authEntryPoint;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity httpSec) throws Exception {
    httpSec
      .csrf().disable()
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .cors()
      .and()
      .authorizeRequests()
      .antMatchers("/").permitAll()
      .antMatchers("/login").permitAll()
      .antMatchers("/swagger-ui/**").permitAll()
      .antMatchers("/swagger-resources").permitAll()
      .antMatchers("/swagger-resources/**").permitAll()
      .antMatchers("/webjars/**").permitAll()
      .antMatchers("/v2/api-docs").permitAll()
      .antMatchers("/h2-console/**").permitAll()
      .antMatchers("/api/v1/auth/register").permitAll()
      .antMatchers("/api/v1/auth/login").permitAll()
      .antMatchers("/api/v1/auth/refresh").permitAll()
      .antMatchers("/api/v1/auth/login/oauth2/**").permitAll()
      .antMatchers("/api/v1/auth/password/reset").permitAll()
      .antMatchers("/api/v1/auth/password/reset/**").permitAll()
      .antMatchers("/test/**").permitAll()
      //.antMatchers("/chat-ws").permitAll()
      //.antMatchers("/chat-ws/**").permitAll()
      //.antMatchers("/api/v1/message").permitAll()
      //.antMatchers("/api/v1/message/**").permitAll()
      .anyRequest().authenticated()
      .and()
      .oauth2Login()
      .loginPage("/login") //TODO: need to change on deploy
      .loginProcessingUrl("/api/v1/auth/login/oauth2/code/*")
      .userInfoEndpoint().userService(oAuth2UserService)
      .and()
      .successHandler(oAuth2SuccessLoginHandler)
      .and()
      .exceptionHandling().authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
    //.exceptionHandling().authenticationEntryPoint(authEntryPoint);

    //For h2 correct visualization
    httpSec.headers().frameOptions().disable();

    //JWT token authentication
    httpSec.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    //Filter for interception of JwtAuthenticationException from jwtAuthFilter
    httpSec.addFilterBefore(filterExceptionHandler, JwtAuthFilter.class);
    

    //CORS config
    // CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
    // configuration.addAllowedOriginPattern("http://localhost:3000");
    // configuration.addAllowedOriginPattern("http://localhost:3000/**");
    // configuration.addAllowedOriginPattern("https://final-step-fe-8-fs-2.vercel.app");
    // configuration.addAllowedOriginPattern("https://final-step-fe-8-fs-2.vercel.app/**");
    // configuration.addAllowedOriginPattern("*"); //TODO: need to change on deploy
    // configuration.addAllowedMethod(HttpMethod.GET);
    // configuration.addAllowedMethod(HttpMethod.POST);
    // configuration.addAllowedMethod(HttpMethod.PUT);
    // configuration.addAllowedMethod(HttpMethod.DELETE);
    // configuration.addAllowedMethod(HttpMethod.OPTIONS);
    //httpSec.cors().disable();

    return httpSec.build();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }
}

