package app.exceptions;

import app.exceptions.authError.JwtAuthenticationException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Additional filter to handle exception from JwtAuthFilter
 */
@Log4j2
@Component
public class FilterExceptionHandler extends OncePerRequestFilter {

  @Autowired
  private ObjectMapper objectMapper;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    try {
      filterChain.doFilter(request, response);
    } catch (JwtAuthenticationException ex) {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      response.setContentType(MediaType.APPLICATION_JSON_VALUE);
      response.setCharacterEncoding("UTF-8");
      response.getWriter()
        .write(this.objectMapper
          .writeValueAsString(new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "JWT token empty or invalid!")));
      log.error("JWT token empty or invalid!");
    } catch (RuntimeException e) {
      response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    String requestMethod = request.getMethod();

    AntPathRequestMatcher[] matchers = {
      new AntPathRequestMatcher("/", requestMethod),
      new AntPathRequestMatcher("/login", requestMethod),
      new AntPathRequestMatcher("/swagger-ui/**", requestMethod),
      new AntPathRequestMatcher("/swagger-resources", requestMethod),
      new AntPathRequestMatcher("/swagger-resources/**", requestMethod),
      new AntPathRequestMatcher("/webjars/**", requestMethod),
      new AntPathRequestMatcher("/v2/api-docs", requestMethod),
      new AntPathRequestMatcher("/h2-console/**", requestMethod),
      new AntPathRequestMatcher("/api/v1/auth/login", requestMethod),
      new AntPathRequestMatcher("/api/v1/auth/register", requestMethod),
      new AntPathRequestMatcher("/api/v1/auth/refresh", requestMethod),
      new AntPathRequestMatcher("/api/v1/auth/password/reset", requestMethod),
      new AntPathRequestMatcher("/api/v1/auth/password/reset/**", requestMethod),
      new AntPathRequestMatcher("/api/v1/auth/login/oauth2/**", requestMethod),
      new AntPathRequestMatcher("/test/**", requestMethod),
      new AntPathRequestMatcher("/chat-ws", requestMethod),
      new AntPathRequestMatcher("/chat-ws/**", requestMethod),
      new AntPathRequestMatcher("/notifications-ws", requestMethod),
      new AntPathRequestMatcher("/notifications-ws/**", requestMethod),
      new AntPathRequestMatcher("/api/v1/auth/oauth/error", HttpMethod.GET.name()),
      new AntPathRequestMatcher("/oauth2/authorization/google", requestMethod),
      new AntPathRequestMatcher("/oauth2/authorization/facebook", requestMethod)
    };

    for (AntPathRequestMatcher matcher : matchers) {
      if (matcher.matches(request)) {
        return true;
      }
    }
    return false;
  }
}
