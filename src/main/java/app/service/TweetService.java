package app.service;

import app.dto.rq.TweetRequest;
import app.dto.rs.TweetResponse;
import app.enums.TweetActionType;
import app.enums.TweetType;
import app.exceptions.tweetError.TweetIsNotFoundException;
import app.model.AttachmentImage;
import app.model.Tweet;
import app.model.UserModel;
import app.repository.TweetActionRepository;
import app.repository.TweetModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TweetService extends GeneralService<Tweet> {
  private final TweetModelRepository tweetModelRepository;
  private final UserModelService userModelService;
  private final TweetActionService tweetActionService;
  private final TweetActionRepository tweetActionRepository;
  private final AttachmentImagesService attachmentImagesService;

  public Optional<Tweet> getTweet(Long id) {
    Optional<Tweet> tweet = findById(id);
    return tweet;
  }

  public Tweet getTweetById(Long id) {
    Tweet tweet = findById(id).orElseThrow(() -> new TweetIsNotFoundException(id));
    return tweet;
  }

  public void deleteTweet(Long tweetId, HttpServletRequest request) {
    if (findById(tweetId).get().getTweetType().equals(TweetType.QUOTE_TWEET)) {
      tweetActionService.deleteRetweet(tweetId, request);
    }
    this.tweetModelRepository.deleteById(tweetId);
  }

  public TweetResponse create(HttpServletRequest request, String tweetBody, TweetType tweetType, MultipartFile[] files, String parentTweetId) {
    UserModel user = userModelService.getUser((Long) request.getAttribute("userId"));
    Tweet tweet = new Tweet();
    tweet.setBody(tweetBody);
    tweet.setTweetType(tweetType);
    tweet.setUser(user);
    if (parentTweetId != null) tweet.setParentTweetId(getTweetById(Long.valueOf(parentTweetId)));
    tweetModelRepository.save(tweet);

    if (tweetType.equals(TweetType.QUOTE_TWEET)) tweetActionService.addRetweet(tweet.getId(), request);

    if (files != null) {
      Set<AttachmentImage> attachmentImageSet = new HashSet<>();
      for (MultipartFile file : files) {
        attachmentImageSet.add(attachmentImagesService.createAttachmentImage(file, tweet));
      }
      tweet.setAttachmentImages(attachmentImageSet);
    }

    return getTweetResponse(tweet);
  }

  private TweetResponse getTweetResponse(Tweet tweet) {
    TweetResponse tweetResponse = new TweetResponse();
    tweetResponse.setTweetId(tweet.getId());
    tweetResponse.setBody(tweet.getBody());
    tweetResponse.setTweetType(tweet.getTweetType());
    tweetResponse.setUserAvatarImage(tweet.getUser().getAvatarImgUrl());
    tweetResponse.setUserTag(tweet.getUser().getUserTag());
    tweetResponse.setParentTweetId(0L);
    tweetResponse.setCountLikes(tweetActionService.getCountLikes(tweet.getId()));
    tweetResponse.setCountRetweets(tweetActionService.getCountRetweet(tweet.getId()));
    tweetResponse.setCountRetweets(tweetActionService.getCountRetweet(tweet.getId()));
    tweetResponse.setCountReply(getCountReply(tweet.getId()));
    tweetResponse.setAttachmentsImages(tweet.getAttachmentImages()
      .stream().map(image -> image.getImgUrl()).collect(Collectors.toSet()));

    return tweetResponse;
  }

  public TweetResponse createTweet(HttpServletRequest request, String tweetBody, MultipartFile[] files) {

    return create(request, tweetBody, TweetType.TWEET, files, null);
  }

  public TweetResponse createRetweet(HttpServletRequest request, String tweetBody, String parentTweetId, MultipartFile[] files) {
    return create(request, tweetBody, TweetType.QUOTE_TWEET, files, parentTweetId);
  }

  public TweetResponse createReply(HttpServletRequest request, String tweetBody, String parrentTweetId, MultipartFile[] files) {
    return create(request, tweetBody, TweetType.REPLY, files, parrentTweetId);
  }

  public Optional<Tweet> updateTweet(Long tweetId, TweetRequest tweetRequest) {
    Optional<Tweet> tweet = tweetModelRepository.findById(tweetId);
    if (tweet.isPresent()) {
      Tweet tweetToUpdate = tweet.get();
      tweetToUpdate.setBody(tweetRequest.getBody());
      tweetModelRepository.save(tweetToUpdate);
    }
    return tweet;
  }

  public ResponseEntity<List<Tweet>> allUserFollowingTweet(HttpServletRequest request, int page, int pageSize) {
    List<Long> userIds = userModelService.getUser((Long) request.getAttribute("userId"))
      .getFollowings().stream().map(u -> u.getId()).toList();
    return ResponseEntity.ok(tweetModelRepository.findTweetsByUserIdsSortedByDate(userIds,
      Pageable.ofSize(pageSize).withPage(page)).toList());
  }

  public Page<Tweet> getUserTweets(Long userId, int page, int pageSize) {
    return tweetModelRepository.getUserTweets(userId, Pageable.ofSize(pageSize).withPage(page));
  }

  public ResponseEntity<List<Tweet>> listTweets(int page, int pageSize) {
    return ResponseEntity.ok(tweetModelRepository.listTweets(Pageable.ofSize(pageSize).withPage(page)).toList());
  }

  public ResponseEntity<List<Tweet>> getAllBookmarks(HttpServletRequest request, int page, int pageSize) {
    return ResponseEntity.ok(tweetActionRepository.findTweetsByActionTypeAndUserId((Long) request.getAttribute("userId"),
      TweetActionType.BOOKMARK, Pageable.ofSize(pageSize).withPage(page)).toList());
  }

  public Integer getCountReply(Long tweetId) {
    return tweetModelRepository.getCountByTweetTypeAndId(TweetType.REPLY, tweetId);
  }
}
