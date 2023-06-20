package app.utils;

import app.service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
class SpringSecurityAuditorAware implements AuditorAware<String> {

  @Autowired
  private AuthUserService authUserService;

  public Optional<String> getCurrentAuditor() {
   return Optional.ofNullable(authUserService.getUserDetails().getUsername());
  }
}
