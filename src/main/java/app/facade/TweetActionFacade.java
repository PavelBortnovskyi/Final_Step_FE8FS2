package app.facade;

import app.dto.rq.TweetActionRequest;
import app.dto.rq.TweetRequest;
import app.dto.rs.TweetActionResponse;
import app.dto.rs.TweetResponse;
import app.exceptions.tweetError.TweetIsNotFoundException;
import app.model.Tweet;
import app.model.TweetAction;
import app.service.TweetActionService;
import app.service.TweetService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Component
@NoArgsConstructor
public class TweetActionFacade extends GeneralFacade<TweetAction, TweetActionRequest, TweetActionResponse> {
    @Autowired
    TweetActionService tweetActionService;
    @PostConstruct
    public void init() {
        super.getMm().typeMap(TweetAction.class, TweetActionResponse.class)
            .addMapping(src -> src.getActionType(), TweetActionResponse::setActionType)
            .addMapping(src -> src.getUser().getId(), TweetActionResponse::setUserId)
            .addMapping(src -> src.getTweet().getId(), TweetActionResponse::setTweetId);

    }
    public TweetActionResponse addLike(Long tweetId, HttpServletRequest request) {
        return tweetActionService.addLike(tweetId, request);
    }

    public TweetActionResponse addBookmark(Long tweetId, HttpServletRequest request) {
        return tweetActionService.addBookmark(tweetId, request);
    }

    @Override
    public TweetAction convertToEntity(TweetActionRequest dto) {
        TweetAction sample = new TweetAction();
        super.getMm().map(dto, sample);
        return sample;
    }
}
