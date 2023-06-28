package app.utils;

import app.service.AuthUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class SpringSecurityAuditorAware implements AuditorAware<String> {

  private static final ThreadLocal<String> currentAuditor = new ThreadLocal<>();
  private final AuthUserService authUserService;

  public Optional<String> getCurrentAuditor() {
    return Optional.ofNullable(authUserService.getUserDetails().getUsername());
  }

  public void setCurrentAuditor(String username) {
    currentAuditor.set(username);
  }
}
