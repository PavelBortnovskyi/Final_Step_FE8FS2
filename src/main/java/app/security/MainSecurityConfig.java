//package app.security;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.annotation.Order;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@Log4j2
//@Configuration
//@Order(2)
//@EnableWebSecurity
//@RequiredArgsConstructor
//@EnableGlobalMethodSecurity(prePostEnabled = true)
//public class MainSecurityConfig {
//  private final JwtAuthFilter jwtAuthFilter;
//
//  public SecurityFilterChain filterChain(HttpSecurity httpSec) throws Exception {
//
//    httpSec
//      .csrf().disable()
//      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//      .and()
//      .authorizeRequests()
//      .anyRequest().authenticated();
//
//    httpSec.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
//
//    return httpSec.build();
//  }
//
//  @Bean
//  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
//    return authConfig.getAuthenticationManager();
//  }
//}
//
//
