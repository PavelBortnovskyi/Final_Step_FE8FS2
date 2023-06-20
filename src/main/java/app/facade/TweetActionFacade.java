package app.facade;

import app.dto.rs.TweetActionResponseDTO;
import app.enums.TweetActionType;
import app.model.TweetAction;
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


  public Page<TweetActionResponseDTO> getTweetActionsByUser(Long userId, TweetActionType tweetAction, Pageable pageable) {
    return tweetActionService.getActionsByUser(userService.getUser(userId), tweetAction, pageable).map(this::convertToDto);
  }

}
