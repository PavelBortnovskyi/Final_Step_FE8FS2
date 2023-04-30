
package app.security;

import app.exceptions.JwtAuthenticationException;
import app.model.UserModel;
import app.repository.RepositoryInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Example;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
@RequiredArgsConstructor
public class UserDetailsServiceImplementation implements UserDetailsService {

  private final RepositoryInterface<UserModel> userModelRepository;

  public UserDetails mapper(UserModel userModel) {
    return User
      .withUsername(userModel.getEmail())
      .password(userModel.getPassword())
      .build();
  }

  @Override
  public UserDetails loadUserByUsername(String userMail) throws UsernameNotFoundException {
    UserModel sample = new UserModel();
    sample.setEmail(userMail);
    Example<UserModel> example = Example.of(sample);
    return userModelRepository.findBy(example, FluentQuery.FetchableFluentQuery::first)
      .map(this::mapper)
      .orElseThrow(() -> new JwtAuthenticationException(String.format("User with email: `%s` not found", userMail), HttpStatus.UNAUTHORIZED
      ));
  }
}
