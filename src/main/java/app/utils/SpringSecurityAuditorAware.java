package app.utils;

import app.service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public
class SpringSecurityAuditorAware implements AuditorAware<String> {

  private static final ThreadLocal<String> currentAuditor = new ThreadLocal<>();

  @Autowired
  private AuthUserService authUserService;

  public Optional<String> getCurrentAuditor() {
   return Optional.ofNullable(authUserService.getUserDetails().getUsername());
  }

  public void setCurrentAuditor(String username) {
    currentAuditor.set(username);
  }
}
