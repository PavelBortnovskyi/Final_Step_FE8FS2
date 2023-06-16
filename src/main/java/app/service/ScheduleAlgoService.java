package app.service;

//@Component
//@EnableScheduling
//@RequiredArgsConstructor
//public class ScheduleAlgoService {
//  private final TweetModelRepository tweetModelRepository;
//  private final RatingModelRepository ratingModelRepository;
//  private final TweetActionService tweetActionService;
//  private final TweetService tweetService;
//
//  @Scheduled(fixedRate = 3600000L) // Выполнять каждый час
//  public void ratingAlgorithm() {
//    ArrayList<RatingModel> tweetsRating = new ArrayList<>();
//    //получаем последние 50 твитов
//    tweetModelRepository.listLast50Tweets(PageRequest.of(0, 50)).stream()
//      .forEach(t -> tweetsRating.add(new RatingModel(t.getId(), getRating(t))));
//
//    // получаем предыдущие твиты, которые попали в рейтинг
//    ratingModelRepository.findAll().forEach(r -> tweetsRating.add(r));
//
//    // создаем параметр сравнения и сортируем по рейтингу
//    Comparator<RatingModel> ratingModelComparator = Comparator.comparingDouble(RatingModel::getTweetRating);
//    Collections.sort(tweetsRating, ratingModelComparator);
//
//    //записываем отсортированые твиты по рейтингу первые 50 или до 50
//    List<RatingModel> savedRating;
//    ratingModelRepository.deleteAll();
//    if (tweetsRating.size() > 50) {
//      savedRating = tweetsRating.subList(0, 49);
//    } else savedRating = tweetsRating;
//    savedRating.forEach(r -> ratingModelRepository.save(r));
//  }
//
//  public Page<Tweet> listTopTweets(int page, int pageSize) {
//    return (Page<Tweet>) ratingModelRepository.findAll(Pageable.ofSize(pageSize).withPage(page))
//        .filter( t -> tweetService.getTweetById(t.getTweetID())!= null)
//        .map(t -> tweetService.getTweetById(t.getTweetID())).stream().collect(Collectors.toList());
//  }
//
//  private double getRating(Tweet tweet) {
//    double coef = 0;
//    // сколько лайков
//    coef = (double) tweetActionService.getCountLikes(tweet.getId()) / (Duration.between(tweet.getCreatedAt(), LocalDateTime.now()).toMinutes()) * 0.001;
//    // сколько прокоментировали
//    coef += tweetService.getCountReply(tweet.getId()) * 0.3;
//    // сколько сохранили
//    coef += (tweetActionService.getCountBookmarks(tweet.getId()) * 0.1);
//    if (tweet.getUser().isVerified()) coef *= 1.5;
//    return coef;
//  }
//}

