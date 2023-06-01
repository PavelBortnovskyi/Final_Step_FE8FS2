package app.utils.ratingAlgo;

import app.model.Tweet;
import app.repository.TweetModelRepository;
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
  @Scheduled(fixedRate = 1000) // Выполнять каждый час
  public void yourScheduledMethod() {
/*    ArrayList<RatingModel> tweetsRating = new ArrayList<>();
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime oneHourAgo = now.minusHours(1);
    System.out.println(oneHourAgo);
    // присвоить рейтинг
    tweetModelRepository.listTweetsFromLastHour(oneHourAgo).stream()
      .forEach(t -> tweetsRating.add(new RatingModel(t.getId(), getRating(t))));

    // достать значения с базы
    // объеденить с посчитаным
    ratingModelRepository.getAll().forEach(r -> tweetsRating.add(r));


    Comparator<RatingModel> ratingModelComparator = Comparator.comparingDouble(RatingModel::getTweetRating);

    // Сортируем список по возрасту с использованием компаратора
    Collections.sort(tweetsRating, ratingModelComparator);
    ratingModelRepository.deleteAll();
    List<RatingModel> savedRating = tweetsRating.subList(0, 50);
    savedRating.forEach(r -> ratingModelRepository.save(r));


    // оставить 50
    // записать в базу
    //System.out.println("Метод, выполняющийся каждый час.");*/
  }

  private double getRating(Tweet tweet){
    return 4455 + tweet.getId();
  }
}

