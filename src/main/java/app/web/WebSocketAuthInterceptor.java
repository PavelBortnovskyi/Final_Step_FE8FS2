package app.web;

import app.enums.TokenType;
import app.exceptions.authError.JwtAuthenticationException;
import app.security.JwtUserDetails;
import app.service.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import javax.servlet.ServletException;
import java.util.Map;

@Component
public class WebSocketAuthInterceptor extends HttpSessionHandshakeInterceptor {

  @Autowired
  private JwtTokenService jwtTokenService;

  @Override
  public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
                                 Map<String, Object> attributes) throws Exception {

    String token = this.jwtTokenService.extractTokenFromRequest(((ServletServerHttpRequest) request).getServletRequest())
      .orElseThrow(() -> new JwtAuthenticationException("Token not found!"));

    if (!token.isEmpty()) {
      if (this.jwtTokenService.validateToken(token, TokenType.ACCESS)) {
        this.authenticateWithToken(token, request);
        //attributes.put("userId", this.jwtTokenService.getIdFromRequest((((ServletServerHttpRequest) request).getServletRequest())));
        return true;
      } else {
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        return false;
      }
    } else {
      response.setStatusCode(HttpStatus.UNAUTHORIZED);
      return false;
    }
  }

  private void authenticateWithToken(String token, ServerHttpRequest request) throws ServletException {
    try {
      JwtUserDetails userDetails = jwtTokenService.extractClaimsFromToken(token, TokenType.ACCESS)
        .flatMap(this.jwtTokenService::extractIdFromClaims)
        .map(JwtUserDetails::new)
        .orElseThrow(() -> new JwtAuthenticationException("Invalid token"));

      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
        userDetails, null, userDetails.getAuthorities());
      authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(((ServletServerHttpRequest) request).getServletRequest()));

      SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    } catch (Exception e) {
      throw new JwtAuthenticationException("Login failed with: " + e.getMessage());
    }
  }
}