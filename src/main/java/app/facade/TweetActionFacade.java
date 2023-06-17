package app.facade;

import app.dto.rs.TweetActionResponseDTO;
import app.dto.rs.TweetResponseDTO;
import app.enums.TweetActionType;
import app.enums.TweetType;
import app.model.AttachmentImage;
import app.model.Tweet;
import app.model.TweetAction;
import app.service.TweetActionService;
import app.service.TweetService;
import app.service.UserService;
import lombok.NoArgsConstructor;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.util.Set;
import java.util.stream.Collectors;


@Component
@NoArgsConstructor
public class TweetActionFacade extends GeneralFacade<TweetAction, Void, TweetActionResponseDTO> {

  @Autowired
  private UserService userService;
  @Autowired
  private TweetActionService tweetActionService;

  public Page<TweetActionResponseDTO> getLikesByUser(Long userId, TweetActionType tweetAction, Pageable pageable){
    return tweetActionService.getActionsByUser(userService.getUser(userId), tweetAction, pageable).map(this::convertToDto);
  }

}
