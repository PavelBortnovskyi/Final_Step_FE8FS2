package app.utils.ratingAlgo;

import app.model.Tweet;
import app.repository.TweetActionRepository;
import app.repository.TweetModelRepository;
import app.service.TweetActionService;
import app.service.TweetService;
import app.service.UserModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.w3c.dom.ls.LSInput;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Component
@EnableScheduling
@RequiredArgsConstructor
public class ScheduleAlgo {
  private final TweetModelRepository tweetModelRepository;
  private final RatingModelRepository ratingModelRepository;
  private final TweetActionService tweetActionService;
  private final TweetService tweetService;

  @Scheduled(fixedRate = 3600000L) // Выполнять каждый час
  public void ratingAlgorithm() {
    ArrayList<RatingModel> tweetsRating = new ArrayList<>();
    //получаем последние 50 твитов
    tweetModelRepository.listLast50Tweets(PageRequest.of(0, 50)).stream()
      .forEach(t -> tweetsRating.add(new RatingModel(t.getId(), getRating(t))));

    // получаем предыдущие твиты, которые попали в рейтинг
    ratingModelRepository.findAll().forEach(r -> tweetsRating.add(r));

    // создаем параметр сравнения и сортируем по рейтингу
    Comparator<RatingModel> ratingModelComparator = Comparator.comparingDouble(RatingModel::getTweetRating);
    Collections.sort(tweetsRating, ratingModelComparator);

    //записываем отсортированые твиты по рейтингу первые 50 или до 50
    List<RatingModel> savedRating;
    ratingModelRepository.deleteAll();
    if (tweetsRating.size() > 50) {
      savedRating = tweetsRating.subList(0, 49);
    } else savedRating = tweetsRating;
    savedRating.forEach(r -> ratingModelRepository.save(r));
  }

  public List<Tweet> tweetsIdList(Pageable pageable){
    //TODO add pageable
    return ratingModelRepository.findAll().stream().map(r -> tweetService.getTweetById(r.getTweetID())).toList();
  }

  public ResponseEntity<List<Tweet>> listTopTweets(int page, int pageSize) {
    return ResponseEntity.ok(tweetsIdList(Pageable.ofSize(pageSize - 1).withPage(page)));
  }

  private double getRating(Tweet tweet) {
    double coef = 0;
    // сколько лайков
    coef = (double) (Duration.between(LocalDateTime.now(), tweet.getCreatedAt()).toMinutes()) / tweetActionService.getCountLikes(tweet.getId());
    // сколько прокоментировали
    coef += tweetService.getCountReply(tweet.getId()) * 0.4;
    // сколько сохранили
    coef += (tweetActionService.getCountBookmarks(tweet.getId()) * 0.2);
    if (tweet.getUser().isVerified()) coef *= 1.5;
    return coef;
  }
}

