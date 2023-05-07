package app.security;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Log4j2
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

  private final JwtAuthFilter jwtAuthFilter;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity httpSec) throws Exception {
    httpSec
      .csrf().disable()
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .authorizeRequests()
      .antMatchers("/api/v1/auth/**").permitAll() //end points need to specified
      .antMatchers("/h2-console/**").permitAll()
      .antMatchers("/test").authenticated()       //need to be replaced for specified end points later
      .anyRequest().authenticated();

    httpSec.headers().frameOptions().disable(); //For h2 correct visualization

    httpSec.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    return httpSec.build();
  }
}

