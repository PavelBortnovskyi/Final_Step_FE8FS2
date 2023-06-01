package app.utils.ratingAlgo;

import app.model.Tweet;
import app.repository.TweetActionRepository;
import app.repository.TweetModelRepository;
import app.service.TweetActionService;
import app.service.UserModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

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
  @Scheduled(fixedRate = 10000) // Выполнять каждый час
  public void ratingAlgorithm() {
    ArrayList<RatingModel> tweetsRating = new ArrayList<>();
    LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
    //получаем все твиты за последний час

    /*tweetModelRepository.listTweetsFromLastHour(oneHourAgo).stream()
      .forEach(t -> tweetsRating.add(new RatingModel(t.getId(), getRating(t))));*/

    tweetModelRepository.findAll().stream()
      .forEach(t -> tweetsRating.add(new RatingModel(t.getId(), getRating(t))));

    // получаем предыдущие твиты, которые попали в рейтинг
    ratingModelRepository.findAll().forEach(r -> tweetsRating.add(r));

    // создаем параметр сравнения и сортируем по рейтингу
    Comparator<RatingModel> ratingModelComparator = Comparator.comparingDouble(RatingModel::getTweetRating);
    Collections.sort(tweetsRating, ratingModelComparator);

    //записываем отсортированые твиты по рейтингу первые 50 или до 50
    List<RatingModel> savedRating;
    ratingModelRepository.deleteAll();
    if(tweetsRating.size() > 50) {savedRating = tweetsRating.subList(0, 49);}
    else savedRating = tweetsRating;
    savedRating.forEach(r -> ratingModelRepository.save(r));
  }

  private double getRating(Tweet tweet){
    double coef;
    coef = tweetActionService.getCountLikes(tweet.getId()) / 60;
    if (tweet.getUser().isVerified()) coef *= 1.5;
    return coef;
  }
}

