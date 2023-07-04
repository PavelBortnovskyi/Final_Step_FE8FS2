//package app.security;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.*;
//import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
//import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
//import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//
//@RequiredArgsConstructor
//public class CustomAccessTokenResponseClient implements OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> {
//
//  private final RestTemplate restTemplate;
//
//  @Override
//  public OAuth2AccessTokenResponse getTokenResponse(OAuth2AuthorizationCodeGrantRequest authorizationGrantRequest) {
//    String tokenUri = authorizationGrantRequest.getClientRegistration().getProviderDetails().getTokenUri();
//
//    HttpHeaders headers = new HttpHeaders();
//    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//
//    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//    params.add("grant_type", "authorization_code");
//    params.add("code", authorizationGrantRequest.getAuthorizationExchange().getAuthorizationResponse().getCode());
//    params.add("redirect_uri", authorizationGrantRequest.getAuthorizationExchange().getAuthorizationRequest().getRedirectUri());
//    params.add("client_id", authorizationGrantRequest.getClientRegistration().getClientId());
//    params.add("client_secret", authorizationGrantRequest.getClientRegistration().getClientSecret());
//
//    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
//    ResponseEntity<OAuth2AccessTokenResponse> response = restTemplate.postForEntity(tokenUri, request, OAuth2AccessTokenResponse.class);
//
//    if (response.getStatusCode() == HttpStatus.OK) {
//      return response.getBody();
//    } else {
//      throw new RuntimeException("Failed to obtain access token");
//    }
//  }
//}
