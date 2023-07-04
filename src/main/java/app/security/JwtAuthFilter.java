package app.security;

import app.enums.TokenType;
import app.exceptions.authError.JwtAuthenticationException;
import app.service.JwtTokenService;
import com.nimbusds.jose.util.Pair;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Log4j2
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtTokenService tokenService;

  /**
   * Filter validates jwt bearer token and make authorization according to validation. In case access token invalid method returns 401 and waiting for refresh token to
   * update token pair.
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    String token = tokenService.extractTokenFromRequest(request).orElseThrow(() -> new JwtAuthenticationException("Token not found!"));

    if (!token.isEmpty()) {
      //Try to validate token as access token
      if (tokenService.validateToken(token, TokenType.ACCESS)) {

        log.info("Token is valid continue...");
        this.processRequestWithToken(request, token);

        //Add value of userId to request to more simple access to it in controllers
        request.setAttribute("userId", tokenService.getIdFromRequest(request).get());
        doFilter(request, response, filterChain);
      } else {
        log.info("Token invalid!");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      }
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
      new AntPathRequestMatcher("/api/v1/tweet/top", requestMethod),
      new AntPathRequestMatcher("/test/**", requestMethod),
      new AntPathRequestMatcher("/chat-ws", HttpMethod.GET.name()),
      new AntPathRequestMatcher("/chat-ws/**", HttpMethod.GET.name()),
      new AntPathRequestMatcher("/api/v1/auth/oauth2/error", HttpMethod.GET.name()),
      new AntPathRequestMatcher("/api/v1/auth/oauth2/tokens", HttpMethod.GET.name()),
      new AntPathRequestMatcher("/api/v1/auth/oauth2/tokens/**", HttpMethod.GET.name()),
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

  private void processRequestWithToken(HttpServletRequest request, String token) {
    try {
      this.tokenService.extractClaimsFromToken(token, TokenType.ACCESS)
        .flatMap(claims -> {
          Long userId = tokenService.extractIdFromClaims(claims).get();
          String username = tokenService.extractUserEmailFromClaims(claims).get();
          return Optional.of(Pair.of(userId, username));
        })
        .map(pair -> new JwtUserDetails(pair.getLeft(), pair.getRight()))
        .map(ud -> new UsernamePasswordAuthenticationToken(ud, "", ud.getAuthorities()))
        .ifPresent((UsernamePasswordAuthenticationToken auth) -> {
          auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(auth);
        });
    } catch (Exception e) {
      throw new JwtAuthenticationException("Authentication failed with: " + e.getMessage());
    }
  }
}