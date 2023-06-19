package app.service;

import app.model.UserModel;
import app.security.JwtUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurrUserService {

  private final UserService userService;


  public JwtUserDetails getUserDetails() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication.getPrincipal() instanceof JwtUserDetails)
    return (JwtUserDetails) authentication.getPrincipal();
    else return new JwtUserDetails(0L, "@Zero");
  }


  public Long getCurrUserId() {
    return getUserDetails().getId();
  }


  public UserModel getCurrUser() {
    return userService.getUser(getCurrUserId());
  }
}
