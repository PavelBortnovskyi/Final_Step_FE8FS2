package app.facade;

import app.dto.rs.TweetActionResponseDTO;
import app.enums.TweetActionType;
import app.model.TweetAction;
import app.model.UserModel;
import app.service.AuthUserService;
import app.service.TweetActionService;
import app.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Log4j2
@Component
@RequiredArgsConstructor
public class TweetActionFacade extends GeneralFacade<TweetAction, Void, TweetActionResponseDTO> {

  private final UserService userService;
  private final TweetActionService tweetActionService;
  private final AuthUserService authUserService;
  private final TweetFacade tweetFacade;


  public Page<TweetActionResponseDTO> getTweetActionsByUser(Long userId, TweetActionType tweetActionType, Pageable pageable) {
    UserModel currentUser = authUserService.getCurrUser();
    return tweetActionService.getActionsByUser(userService.getUser(userId), tweetActionType, pageable).map(this::convertToDto)
      .map(tweetAction -> tweetAction.setTweet(tweetFacade.setCustomFields(tweetAction.getTweet(), currentUser)));
  }

}
