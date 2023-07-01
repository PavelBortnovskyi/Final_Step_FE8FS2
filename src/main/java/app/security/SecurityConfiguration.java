package app.security;

import app.exceptions.FilterExceptionHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;


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

  private final OAuth2FailureLoginHandler oAuth2FailureLoginHandler;

  //private final CustomAccessTokenResponseClient customAccessTokenResponseClient;

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
      .antMatchers("/api/v1/tweet/top**").permitAll()
      .antMatchers("/chat-ws").permitAll()
      .antMatchers("/api/v1/auth/oauth/error").permitAll()
      .anyRequest().authenticated()
      .and()
      .oauth2Login()
      //.authorizationEndpoint().baseUri("/")
      //.authorizationRequestRepository(lenientAuthorizationRequestRepository())
      //.and()
      //.tokenEndpoint().accessTokenResponseClient(customAccessTokenResponseClient)
      //.and()
      //.loginPage("/login").loginPage("https://final-step-fe-8-fs-2.vercel.app")//TODO: need to change on deploy
      .loginProcessingUrl("/api/v1/auth/login/oauth2/code/*")
      .userInfoEndpoint().userService(oAuth2UserService)
      .and()
      .successHandler(oAuth2SuccessLoginHandler)
      .failureHandler(oAuth2FailureLoginHandler)
      .and()
      .exceptionHandling().authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));

    //For h2 correct visualization
    httpSec.headers().frameOptions().disable();

    //JWT token authentication
    httpSec.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    //Filter for interception of JwtAuthenticationException from jwtAuthFilter
    httpSec.addFilterBefore(filterExceptionHandler, JwtAuthFilter.class);

    //X-frame-Options for SockJS
    //httpSec.headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin));


    //CORS config
//     CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
//     configuration.addAllowedOriginPattern("http://localhost:3000");
//     configuration.addAllowedOriginPattern("http://localhost:3000/**");
//     configuration.addAllowedOriginPattern("https://final-step-fe-8-fs-2.vercel.app");
//     configuration.addAllowedOriginPattern("https://final-step-fe-8-fs-2.vercel.app/**");
//     configuration.addAllowedOriginPattern("*"); //TODO: need to change on deploy
//     configuration.addAllowedMethod(HttpMethod.GET);
//     configuration.addAllowedMethod(HttpMethod.POST);
//     configuration.addAllowedMethod(HttpMethod.PUT);
//     configuration.addAllowedMethod(HttpMethod.DELETE);
//     configuration.addAllowedMethod(HttpMethod.OPTIONS);
//    httpSec.cors().disable();

    return httpSec.build();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

//  @Bean
//  public AuthorizationRequestRepository<OAuth2AuthorizationRequest> lenientAuthorizationRequestRepository() {
//    return new HttpSessionOAuth2AuthorizationRequestRepository() {
//      @Override
//      public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
//        OAuth2AuthorizationRequest authorizationRequest = super.loadAuthorizationRequest(request);
//        if (authorizationRequest != null) {
//          // Удалите проверку параметра state
//          authorizationRequest = OAuth2AuthorizationRequest.from(authorizationRequest)
//            .state(null)
//            .build();
//        }
//        return authorizationRequest;
//      }
//    };
//  }
}

