package app.utils;

import app.service.CurrUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
class SpringSecurityAuditorAware implements AuditorAware<String> {

  @Autowired
  private CurrUserService currUserService;

  public Optional<String> getCurrentAuditor() {
   return Optional.ofNullable(currUserService.getUserDetails().getUsername());
  }
}
