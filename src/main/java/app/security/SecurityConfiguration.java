package app.security;

import app.exceptions.FilterExceptionHandler;
import app.service.OAuth2UserServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.IdTokenClaimNames;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;

@Log4j2
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {

  @Autowired
  private JwtAuthFilter jwtAuthFilter;

  @Autowired
  private FilterExceptionHandler filterExceptionHandler;

  @Autowired
  private OAuth2UserServiceImpl oAuth2UserService;


//  @Autowired
//  @Qualifier("delegatedAuthenticationEntryPoint")
//  AuthenticationEntryPoint authEntryPoint;

  @Value("${google.client-id}")
  private String googleClientId;

  @Value("${google.client-secret}")
  private String googleClientSecret;

  @Value("${facebook.client-id}")
  private String facebookClientId;

  @Value("${facebook.client-secret}")
  private String facebookClientSecret;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity httpSec) throws Exception {
    httpSec
      .csrf().disable()
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .authorizeRequests()
      .antMatchers("/").permitAll()
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
      .anyRequest().authenticated()
      .and()
      .oauth2Login()
      .loginProcessingUrl("/api/v1/auth/login/oauth2/code/{registrationId}")
      .defaultSuccessUrl("https://final-step-fe-8-fs-2.vercel.app")
      .failureUrl("https://final-step-fe-8-fs-2.vercel.app/error")
      .userInfoEndpoint()
      .userService(oAuth2UserService)
      .and()
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
    CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
    configuration.addAllowedOrigin("http://localhost:3000/**");
    configuration.addAllowedOrigin("https://final-step-fe-8-fs-2.vercel.app/**");
    httpSec.cors().configurationSource(request -> new CorsConfiguration(configuration));
    //httpSec.cors().disable();

    return httpSec.build();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public ClientRegistrationRepository clientRegistrationRepository() {
    return new InMemoryClientRegistrationRepository(Arrays.asList(
      facebookClientRegistration(),
      googleClientRegistration()
    ));
  }

  private ClientRegistration googleClientRegistration() {
    return ClientRegistration.withRegistrationId("google")
      .clientId(googleClientId)
      .clientSecret(googleClientSecret)
      .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
      .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
      .redirectUri("http://localhost:8080/api/v1/auth/login/oauth2/code/google")
      .scope("email%20profile")
      .authorizationUri("https://accounts.google.com/o/oauth2/auth")
      .tokenUri("https://oauth2.googleapis.com/token")
      .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
      .userNameAttributeName(IdTokenClaimNames.SUB)
      .jwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
      .clientName("Google")
      .build();
  }

  private ClientRegistration facebookClientRegistration() {
    return ClientRegistration.withRegistrationId("facebook")
      .clientId(facebookClientId)
      .clientSecret(facebookClientSecret)
      .clientAuthenticationMethod(ClientAuthenticationMethod.BASIC)
      .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
      .redirectUri("http://localhost:8080/api/v1/auth/login/oauth2/code/facebook")
      .scope("email", "public_profile", "user_birthday")
      .authorizationUri("https://www.facebook.com/v17.0/dialog/oauth")
      .tokenUri("https://graph.facebook.com/v17.0/oauth/access_token")
      .userInfoUri("https://graph.facebook.com/me?fields=id,email")
      .userNameAttributeName(IdTokenClaimNames.SUB)
      .clientName("Facebook")
      .build();
  }
}

