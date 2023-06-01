package app.utils.ratingAlgo;

import app.model.Tweet;
import app.repository.TweetModelRepository;
import lombok.RequiredArgsConstructor;
import org.h2.mvstore.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.awt.print.Pageable;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Component
@EnableScheduling
@RequiredArgsConstructor
public class ScheduleAlgo {
  private final TweetModelRepository tweetModelRepository;
  @Scheduled(fixedRate = 1000) // Выполнять каждый час
  public void yourScheduledMethod() {
    /*ArrayList<RatingModel> tweetsRating = new ArrayList<>();
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime oneHourAgo = now.minusHours(1);
    System.out.println(oneHourAgo);
    // присвоить рейтинг
    tweetModelRepository.listTweetsFromLastHour(oneHourAgo).stream()
      .forEach(t -> tweetsRating.add(new RatingModel(t.getId(), getRating(t))));*/



    // достать значения с базы
    // объеденить с посчитаным
    // оставить 50
    // записать в базу
    //System.out.println("Метод, выполняющийся каждый час.");
  }

  private double getRating(Tweet tweet){
    return 4455 + tweet.getId();
  }
}

