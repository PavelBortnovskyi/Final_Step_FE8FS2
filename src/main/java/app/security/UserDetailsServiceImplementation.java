
package app.security;

import app.exceptions.AuthErrorException;
import app.exceptions.EmailNotFoundException;
import app.model.UserModel;
import app.service.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Log4j2
@Configuration
@RequiredArgsConstructor
public class UserDetailsServiceImplementation implements UserDetailsService {

  private final UserModelService userModelService;

  public UserDetails mapper(UserModel userModel) {
    return User
      .withUsername(userModel.getEmail())
      .password(userModel.getPassword())
      .roles("USER")
      .build();
  }

  /**
   * Method returns User Details object for Spring Security authentication procedure using user email as login parameter
   * @throws UsernameNotFoundException
   */
  @Override
  public UserDetails loadUserByUsername(String userMail) throws UsernameNotFoundException {
    log.info(userMail);
    return this.userModelService.getUser(userMail)
      .map(this::mapper)
      .orElseThrow(() -> new EmailNotFoundException(String.format("User with email: `%s` not found", userMail)
      ));
  }
}
