//
//package app.security;
//
//import app.exceptions.JwtAuthenticationException;
//import app.model.UserModel;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//@Configuration
//@RequiredArgsConstructor
//public class UserDetailsServiceImplementation implements UserDetailsService {
//
//  private final UserModelRepository userModelRepository;
//
//  public UserDetails mapper(UserModel userModel) {
//    return User
//      .withUsername(userModel.getEmail())
//      .password(userModel.getPassword())
//      .build();
//  }
//
//  @Override
//  public UserDetails loadUserByUsername(String userMail) throws UsernameNotFoundException {
//    return userModelRepository.findUserByMail(userMail)
//      .map(this::mapper)
//      .orElseThrow(() -> new JwtAuthenticationException(String.format("User with email: `%s` not found", userMail)
//      ));
//  }
//}
