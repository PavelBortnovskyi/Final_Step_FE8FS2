package app.security;

import app.enums.TokenType;
import app.exceptions.authError.JwtAuthenticationException;
import app.model.UserModel;
import app.service.JwtTokenService;
import app.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
import java.util.HashMap;
import java.util.Map;

@Log4j2
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtTokenService tokenService;

  private final UserService userService;

  private final ObjectMapper objectMapper;

  /**
   * Filter validates jwt bearer token and make authorization according to validation. In case access token invalid method returns 401 and waiting for refresh token to
   * update token pair.
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    String token = this.tokenService.extractTokenFromRequest(request).orElseThrow(() -> new JwtAuthenticationException("Token not found!"));

    if (!token.isEmpty()) {
      //Try to validate token as access token
      if (this.tokenService.validateToken(token, TokenType.ACCESS)) {

        log.info("Token is valid continue...");
        this.processRequestWithToken(request, response, filterChain, token);

        //Add value of userId to request to more simple access to it in controllers
        request.setAttribute("userId", this.tokenService.getIdFromRequest(request).get());
        doFilter(request, response, filterChain);
      } else {
        //Try to validate token as refresh token
        if (this.tokenService.validateToken(token, TokenType.REFRESH) && !this.tokenService.checkRefreshTokenStatus(token)) {

          //Get user from DB to create new token pair and update refresh token
          UserModel currUser = this.userService.getUserByRefreshToken(token);
          String newAccessToken = this.tokenService.createToken(currUser.getId(), TokenType.ACCESS, currUser.getUserTag(), currUser.getEmail());
          String newRefreshToken = this.tokenService.createToken(currUser.getId(), TokenType.REFRESH);
          this.tokenService.updateRefreshToken(currUser, newRefreshToken);
          log.info("Refresh token updated for user with id: " + currUser.getId());

          Map<String, String> tokens = new HashMap<>();
          tokens.put("access_token", newAccessToken);
          tokens.put("refresh_token", token);

          String tokensJson = this.objectMapper.writeValueAsString(tokens);

          response.setContentType("application/json");
          response.setCharacterEncoding("UTF-8");
          response.getWriter().write(tokensJson);
        } else {
          log.info("Token invalid!");
          response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
      }
    }
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    String requestMethod = request.getMethod();

    AntPathRequestMatcher[] matchers = {
      new AntPathRequestMatcher("/", requestMethod),
      new AntPathRequestMatcher("/swagger-ui/**", requestMethod),
      new AntPathRequestMatcher("/swagger-resources", requestMethod),
      new AntPathRequestMatcher("/swagger-resources/**", requestMethod),
      new AntPathRequestMatcher("/webjars/**", requestMethod),
      new AntPathRequestMatcher("/v2/api-docs", requestMethod),
      new AntPathRequestMatcher("/h2-console/**", requestMethod),
      new AntPathRequestMatcher("/api/v1/auth/login", requestMethod),
      new AntPathRequestMatcher("/api/v1/auth/register", requestMethod),
      new AntPathRequestMatcher("/api/v1/auth/password/reset", requestMethod),
      new AntPathRequestMatcher("/api/v1/auth/password/reset/**", requestMethod),
      new AntPathRequestMatcher("/test/**", requestMethod),
      //new AntPathRequestMatcher("/tweet/**", requestMethod),
      //new AntPathRequestMatcher("/api/v1/chat/create", requestMethod)
    };

    for (AntPathRequestMatcher matcher : matchers) {
      if (matcher.matches(request)) {
        return true;
      }
    }
    return false;
  }

  private void processRequestWithToken(HttpServletRequest request, HttpServletResponse response,
                                       FilterChain filterChain, String token) throws ServletException, IOException {
    try {
      this.tokenService.extractClaimsFromToken(token, TokenType.ACCESS)
        .flatMap(this.tokenService::extractIdFromClaims)
        .map(JwtUserDetails::new)
        .map(ud -> new UsernamePasswordAuthenticationToken(ud, null, ud.getAuthorities()))
        .ifPresent((UsernamePasswordAuthenticationToken auth) -> {
          auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(auth);
        });
    } catch (Exception e) {
      throw new JwtAuthenticationException("Login failed with: " + e.getMessage());
    }
  }
}