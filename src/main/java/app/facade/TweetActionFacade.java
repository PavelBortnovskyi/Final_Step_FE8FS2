package app.facade;

import app.dto.rs.TweetActionResponseDTO;
import app.enums.TweetActionType;
import app.model.TweetAction;
import app.service.TweetActionService;
import app.service.UserService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;


@Component
@NoArgsConstructor
public class TweetActionFacade extends GeneralFacade<TweetAction, Void, TweetActionResponseDTO> {

  @Autowired
  private UserService userService;
  @Autowired
  private TweetActionService tweetActionService;

  public Page<TweetActionResponseDTO> getLikesByUser(Long userId, TweetActionType tweetAction, Pageable pageable) {
    return tweetActionService.getActionsByUser(userService.getUser(userId), tweetAction, pageable).map(this::convertToDto);
  }

}
