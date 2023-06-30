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
  //@Scheduled(fixedRate = 10000L) // Выполнять каждые 10 сек
  public void ratingAlgorithm() {
    Map<Long, Double> tweetsRating = new HashMap<>();
    //получаем последние созданые 50 твитов
    tweetModelRepository.listLast50Tweets(PageRequest.of(0, 50)).stream()
      .forEach(t -> tweetsRating.put(t.getId(), setRating(t)));


    //для твитов созданые за последний час
    //LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
    //tweetModelRepository.listLastTweetsPerOneHour(oneHourAgo).stream()
    //    .forEach(t -> tweetsRating.put(t.getId(), setRating(t)));

    // получаем предыдущие твиты, которые попали в рейтинг
    ratingModelRepository.findAll().forEach(r -> tweetsRating.put(r.getTweetID(), setRating(tweetService.getTweet(r.getTweetID()))));

    //добавляем все твиты в один список и удаляем повторы
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
    //очищаем БД и записываем новый рейтинг
    ratingModelRepository.deleteAll();
    if (tweetsRating.size() >= 50) {
      savedRating = tweetsRatingSorted.subList(tweetsRatingSorted.size() - 50, tweetsRatingSorted.size());
    } else savedRating = tweetsRatingSorted;
    savedRating.forEach(r -> ratingModelRepository.save(r));
    log.info("Generated new rating tweets. Total rating tweets: " + savedRating.size());
  }

  //вывод рейтинговых твитов
  public Page<Tweet> getTopTweets(Pageable pageable) {
    return ratingModelRepository.findAllByOrderByTweetRatingDesc(pageable).map(t -> tweetService.getTweet(t.getTweetID()));
  }

  //расчет коефициента рейтинга для твитов
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

