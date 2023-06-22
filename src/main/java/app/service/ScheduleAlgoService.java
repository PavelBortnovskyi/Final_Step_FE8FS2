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

  @Scheduled(fixedRate = 3600000L) // Выполнять каждый час
  //@Scheduled(fixedRate = 10000L) // Выполнять каждый час
  public void ratingAlgorithm() {
    Map<Long, Double> tweetsRating = new HashMap<>();
    //получаем последние 50 твитов
    tweetModelRepository.listLast50Tweets(PageRequest.of(0, 50)).stream()
      .forEach(t -> tweetsRating.put(t.getId(), setRating(t)));

    // получаем предыдущие твиты, которые попали в рейтинг
    ratingModelRepository.findAll().forEach(r -> tweetsRating.put(r.getTweetID(), setRating(tweetService.getTweet(r.getTweetID()))));


    LinkedList<RatingModel> tweetsRatingSorted = new LinkedList<>();

    for (Map.Entry<Long, Double> entry : tweetsRating.entrySet()) {
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
    if (tweetsRating.size() >= 50) {
      savedRating = tweetsRatingSorted.subList(tweetsRatingSorted.size() - 50, tweetsRatingSorted.size());
    } else savedRating = tweetsRatingSorted;
    savedRating.forEach(r -> ratingModelRepository.save(r));
    log.info("Generated new rating tweets");
  }

  public Page<Tweet> getTopTweets(Pageable pageable) {
    ratingModelRepository.findAllByOrderByTweetRatingDesc(pageable).forEach(t -> log.info(t.getTweetID()));
    return ratingModelRepository.findAllByOrderByTweetRatingDesc(pageable).map(t -> tweetService.getTweet(t.getTweetID()));
  }

  private double setRating(Tweet tweet) {
    double coef;
    // сколько лайков
    coef = tweetActionService.getCountLikes(tweet) * 0.02;
    // сколько прокоментировали
    coef += tweetService.getCountRetweetTweets(tweet) * 0.5;

    coef += tweetService.getCountReplies(tweet) * 0.2;
    // сколько сохранили
    coef += (tweetActionService.getCountBookmarks(tweet)) * 0.05;
    if (tweet.getUser().isVerified()) coef *= 1.5;
    return coef;
  }
}

