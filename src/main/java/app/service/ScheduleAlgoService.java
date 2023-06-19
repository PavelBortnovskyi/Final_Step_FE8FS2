package app.service;

import app.model.RatingModel;
import app.model.Tweet;
import app.repository.RatingModelRepository;
import app.repository.TweetModelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.nio.DoubleBuffer;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Component
@EnableScheduling
@RequiredArgsConstructor
@Log4j2
public class ScheduleAlgoService {
  private final TweetModelRepository tweetModelRepository;
  private final RatingModelRepository ratingModelRepository;
  private final TweetActionService tweetActionService;
  private final TweetService tweetService;

  //@Scheduled(fixedRate = 3600000L) // Выполнять каждый час
  @Scheduled(fixedRate = 10000L) // Выполнять каждый час
  public void ratingAlgorithm() {
    Map<Long, Double> tweetsRating = new HashMap<>();
    //получаем последние 50 твитов
    tweetModelRepository.listLast50Tweets(PageRequest.of(0, 50)).stream()
      .forEach(t -> tweetsRating.put(t.getId(), setRating(t)));

    // получаем предыдущие твиты, которые попали в рейтинг
    ratingModelRepository.findAll().forEach(r -> tweetsRating.put(r.getTweetID(), setRating(tweetService.getTweet(r.getTweetID()))));


    LinkedList<RatingModel> tweetsRatingSorted = new LinkedList<>();

    for (Map.Entry<Long, Double> entry: tweetsRating.entrySet()) {
      Long key = entry.getKey();
      Double value = entry.getValue();
      tweetsRatingSorted.add(new RatingModel(key, value));
    }

        
    // создаем параметр сравнения и сортируем по рейтингу
    Comparator<RatingModel> ratingModelComparator = Comparator.comparingDouble(RatingModel::getTweetRating);
    Collections.sort(tweetsRatingSorted, ratingModelComparator);

    

    //записываем отсортированые твиты по рейтингу первые 50 или до 50
    List<RatingModel> savedRating;

    ratingModelRepository.deleteAll();
    if (tweetsRating.size() > 50) {
      savedRating = tweetsRatingSorted.subList(0, 49);
    } else savedRating = tweetsRatingSorted;
    savedRating.forEach(r -> ratingModelRepository.save(r));
    log.info("Generated new rating tweets");
  }

  public Page<Tweet> getTopTweets(Pageable pageable) {
    return ratingModelRepository.findAllByOrderByTweetRatingAsc(pageable).map(t -> tweetService.getTweet(t.getTweetID()));
  }

  private double setRating(Tweet tweet) {
    double coef;
    // сколько лайков
    coef =  tweetActionService.getCountLikes(tweet);
    // сколько прокоментировали
    coef += tweetService.getCountRetweetTweets(tweet);

    coef += tweetService.getCountReplies(tweet);
    // сколько сохранили
    coef += (tweetActionService.getCountBookmarks(tweet));
    if (tweet.getUser().isVerified()) coef *= 1.5;
    return coef;
  }
}

