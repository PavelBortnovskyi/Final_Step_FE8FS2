package app.security;

import app.exceptions.FilterExceptionHandler;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

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
  @Qualifier("delegatedAuthenticationEntryPoint")
  AuthenticationEntryPoint authEntryPoint;

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
      .antMatchers("/api/v1/auth/password/reset").permitAll()
      .antMatchers("/api/v1/auth/password/reset/**").permitAll()
      .antMatchers("/test/**").permitAll()
      //.antMatchers("/user/**").permitAll()
      //.antMatchers("/tweet/**").permitAll()
      .anyRequest().authenticated()
      .and()
      //.oauth2Login();
      .exceptionHandling().authenticationEntryPoint(authEntryPoint);

    //For h2 correct visualization
    httpSec.headers().frameOptions().disable();

    //JWT token authentication
    httpSec.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    //Filter for interception of JwtAuthenticationException from jwtAuthFilter
    httpSec.addFilterBefore(filterExceptionHandler, JwtAuthFilter.class);

    //Disable CORS
    CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
    configuration.addAllowedMethod(HttpMethod.GET);
    configuration.addAllowedMethod(HttpMethod.DELETE);
    configuration.addAllowedMethod(HttpMethod.PUT);
    configuration.addAllowedMethod(HttpMethod.POST);
    httpSec.cors().configurationSource(request -> new CorsConfiguration(configuration));
    //httpSec.cors().disable();

    return httpSec.build();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }
}

