//package app.controller;
//
//import app.enums.NotificationType;
//import app.enums.TweetActionType;
//import app.enums.TweetType;
//import app.facade.AuthFacade;
//import app.model.*;
//import app.service.*;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.http.MediaType;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.HashSet;
//import java.util.Set;
//
//@Log4j2
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/test")
//public class TestController {
//
//  private final UserService userService;
//
//  private final PasswordEncoder encoder;
//
//  private final JwtTokenService jwtTokenService;
//
//  private final AuthenticationManager authenticationManager;
//
//  private final AuthFacade authFacade;
//
//  private final MessageService messageService;
//
//  private final TweetService tweetService;
//
//  private final TweetActionService tweetActionService;
//
//  private final ChatService chatService;
//
//  private final NotificationService notificationService;
//
//  @PostMapping(value = "/addNotifications", produces = MediaType.APPLICATION_JSON_VALUE)
//  public void handleAddNotifications() throws InterruptedException {
//    Notification sample1 = new Notification();
//    sample1.setTweet(tweetService.getTweetById(1L));
//    sample1.setRead(true);
//    sample1.setNotificationType(NotificationType.LIKE);
//    sample1.setInitiatorUser(userService.getUser(2L));
//    sample1.setReceiverUser(sample1.getTweet().getUser());
//    this.notificationService.save(sample1);
//
//    Notification sample2 = new Notification();
//    sample2.setTweet(tweetService.getTweetById(1L));
//    sample2.setRead(false);
//    sample2.setNotificationType(NotificationType.LIKE);
//    sample2.setInitiatorUser(userService.getUser(3L));
//    sample2.setReceiverUser(sample2.getTweet().getUser());
//    this.notificationService.save(sample2);
//
//    Notification sample3 = new Notification();
//    sample3.setTweet(tweetService.getTweetById(1L));
//    sample3.setRead(false);
//    sample3.setNotificationType(NotificationType.LIKE);
//    sample3.setInitiatorUser(userService.getUser(4L));
//    sample3.setReceiverUser(sample3.getTweet().getUser());
//    this.notificationService.save(sample3);
//
//    Notification sample4 = new Notification();
//    sample4.setTweet(tweetService.getTweetById(1L));
//    sample4.setRead(false);
//    sample4.setNotificationType(NotificationType.LIKE);
//    sample4.setInitiatorUser(userService.getUser(5L));
//    sample4.setReceiverUser(sample4.getTweet().getUser());
//    this.notificationService.save(sample4);
//
//    Notification sample5 = new Notification();
//    sample5.setTweet(tweetService.getTweetById(1L));
//    sample5.setRead(true);
//    sample5.setNotificationType(NotificationType.QUOTE_TWEET);
//    sample5.setInitiatorUser(userService.getUser(1L));
//    sample5.setReceiverUser(sample5.getTweet().getUser());
//    this.notificationService.save(sample5);
//
//    Notification sample6 = new Notification();
//    sample6.setTweet(tweetService.getTweetById(1L));
//    sample6.setRead(false);
//    sample6.setNotificationType(NotificationType.QUOTE_TWEET);
//    sample6.setInitiatorUser(userService.getUser(2L));
//    sample6.setReceiverUser(sample6.getTweet().getUser());
//    this.notificationService.save(sample6);
//
//    Notification sample7 = new Notification();
//    sample7.setTweet(tweetService.getTweetById(1L));
//    sample7.setRead(true);
//    sample7.setNotificationType(NotificationType.REPLY);
//    sample7.setInitiatorUser(userService.getUser(3L));
//    sample7.setReceiverUser(sample7.getTweet().getUser());
//    this.notificationService.save(sample7);
//
//    Notification sample8 = new Notification();
//    sample8.setTweet(tweetService.getTweetById(1L));
//    sample8.setRead(false);
//    sample8.setNotificationType(NotificationType.REPLY);
//    sample8.setInitiatorUser(userService.getUser(4L));
//    sample8.setReceiverUser(sample8.getTweet().getUser());
//    this.notificationService.save(sample8);
//
//    Notification sample9 = new Notification();
//    sample9.setTweet(tweetService.getTweetById(1L));
//    sample9.setRead(true);
//    sample9.setNotificationType(NotificationType.RETWEET);
//    sample9.setInitiatorUser(userService.getUser(5L));
//    sample9.setReceiverUser(sample9.getTweet().getUser());
//    this.notificationService.save(sample9);
//
//    Notification sample10 = new Notification();
//    sample10.setTweet(tweetService.getTweetById(1L));
//    sample10.setRead(false);
//    sample10.setNotificationType(NotificationType.RETWEET);
//    sample10.setInitiatorUser(userService.getUser(2L));
//    sample10.setReceiverUser(sample10.getTweet().getUser());
//    this.notificationService.save(sample10);
//
//    Notification sample11 = new Notification();
//    sample11.setTweet(tweetService.getTweetById(27L));
//    sample11.setRead(false);
//    sample11.setNotificationType(NotificationType.LIKE);
//    sample11.setInitiatorUser(userService.getUser(5L));
//    sample11.setReceiverUser(sample11.getTweet().getUser());
//    this.notificationService.save(sample11);
//
//    Notification sample12 = new Notification();
//    sample12.setTweet(tweetService.getTweetById(27L));
//    sample12.setRead(true);
//    sample12.setNotificationType(NotificationType.LIKE);
//    sample12.setInitiatorUser(userService.getUser(2L));
//    sample12.setReceiverUser(sample12.getTweet().getUser());
//    this.notificationService.save(sample12);
//
//    Notification sample13 = new Notification();
//    sample13.setTweet(tweetService.getTweetById(27L));
//    sample13.setRead(true);
//    sample13.setNotificationType(NotificationType.RETWEET);
//    sample13.setInitiatorUser(userService.getUser(3L));
//    sample13.setReceiverUser(sample13.getTweet().getUser());
//    this.notificationService.save(sample13);
//
//    Notification sample14 = new Notification();
//    sample14.setTweet(tweetService.getTweetById(27L));
//    sample14.setRead(false);
//    sample14.setNotificationType(NotificationType.RETWEET);
//    sample14.setInitiatorUser(userService.getUser(4L));
//    sample14.setReceiverUser(sample14.getTweet().getUser());
//    this.notificationService.save(sample14);
//
//    Notification sample15 = new Notification();
//    sample15.setTweet(tweetService.getTweetById(27L));
//    sample15.setRead(true);
//    sample15.setNotificationType(NotificationType.QUOTE_TWEET);
//    sample15.setInitiatorUser(userService.getUser(3L));
//    sample15.setReceiverUser(sample15.getTweet().getUser());
//    this.notificationService.save(sample15);
//
//    Notification sample16 = new Notification();
//    sample16.setTweet(tweetService.getTweetById(27L));
//    sample16.setRead(true);
//    sample16.setNotificationType(NotificationType.QUOTE_TWEET);
//    sample16.setInitiatorUser(userService.getUser(2L));
//    sample16.setReceiverUser(sample16.getTweet().getUser());
//    this.notificationService.save(sample16);
//  }
//
//  @PostMapping(value = "/addMessages", produces = MediaType.APPLICATION_JSON_VALUE)
//  public void handleAddMessages() throws InterruptedException {
//    Long chatSample1 = this.chatService.createChat(1L, 2L).getId();
//    Long chatSample2 = this.chatService.createChat(1L, 3L).getId();
//    Long chatSample3 = this.chatService.createChat(1L, 4L).getId();
//    Long chatSample4 = this.chatService.createChat(2L, 3L).getId();
//    Long chatSample5 = this.chatService.createChat(2L, 5L).getId();
//    Long chatSample6 = this.chatService.createChat(3L, 4L).getId();
//    Long chatSample7 = this.chatService.createChat(4L, 2L).getId();
//    Long groupChatId = this.chatService.createChat(5L, 1L).getId();
//    this.chatService.addUserToChat(2L, groupChatId);
//    this.chatService.addUserToChat(3L, groupChatId);
//    this.chatService.addUserToChat(4L, groupChatId);
//
//    //Sample 1
//    this.messageService.save(new Message(this.chatService.findById(chatSample1).get(), this.userService.getUserO(1L).get(), "Hi my friend!", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample1).get(), this.userService.getUserO(2L).get(), "Aloha!", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample1).get(), this.userService.getUserO(2L).get(), "How are you today?!", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample1).get(), this.userService.getUserO(1L).get(), "I am fine, thanks!", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample1).get(), this.userService.getUserO(1L).get(), "https://www.youtube.com/watch?v=dQw4w9WgXcQ", LocalDateTime.now()));
//
//    //Sample 2
//    this.messageService.save(new Message(this.chatService.findById(chatSample2).get(), this.userService.getUserO(1L).get(), "Wake up, Neo!", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample2).get(), this.userService.getUserO(1L).get(), "Wake up , Matrix has you!", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample2).get(), this.userService.getUserO(1L).get(), "Follow the white rabbit, Neo", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample2).get(), this.userService.getUserO(3L).get(), "Again? My Kung-Fu is still more powerfully than yours, go away!", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample2).get(), this.userService.getUserO(1L).get(), "Booooring...", LocalDateTime.now()));
//
//    //Sample 3
//    this.messageService.save(new Message(this.chatService.findById(chatSample3).get(), this.userService.getUserO(1L).get(), "Доброго вечора, ми з України!", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample3).get(), this.userService.getUserO(1L).get(), "https://www.youtube.com/watch?v=BvgNgTPTkSo", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample3).get(), this.userService.getUserO(4L).get(), "Слава Україні!", LocalDateTime.now()));
//    Thread.sleep(2000);
//
//    //Sample 4
//    this.messageService.save(new Message(this.chatService.findById(chatSample4).get(), this.userService.getUserO(3L).get(), "Дратуті!", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample4).get(), this.userService.getUserO(2L).get(), "І тобі привіт.", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample4).get(), this.userService.getUserO(2L).get(), "Комарів бойових погодував?", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample4).get(), this.userService.getUserO(2L).get(), "Качок-перехоплювачів відправив?", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample4).get(), this.userService.getUserO(3L).get(), "Авжеж!", LocalDateTime.now()));
//
//    //Sample 5
//    this.messageService.save(new Message(this.chatService.findById(chatSample5).get(), this.userService.getUserO(5L).get(), "こんにちは兄弟！", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample5).get(), this.userService.getUserO(5L).get(), "散歩に行く？", LocalDateTime.now()));
//    Thread.sleep(2000);
//
//    //Sample 6
//    this.messageService.save(new Message(this.chatService.findById(chatSample6).get(), this.userService.getUserO(3L).get(), "Haluatko lisää näitä pehmeitä tuoreita pullia?)))", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample6).get(), this.userService.getUserO(4L).get(), "Kuoren kanssa!", LocalDateTime.now()));
//    Thread.sleep(2000);
//
//    //Sample 7
//    this.messageService.save(new Message(this.chatService.findById(chatSample7).get(), this.userService.getUserO(2L).get(), "आज मैंने नोब्स के लिए एक और गाइड लिखी!", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(chatSample7).get(), this.userService.getUserO(4L).get(), "तो आप एक नोब हैं", LocalDateTime.now()));
//    Thread.sleep(2000);
//
//    //Group sample
//    this.messageService.save(new Message(this.chatService.findById(groupChatId).get(), this.userService.getUserO(5L).get(), "Hello everyone!", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(groupChatId).get(), this.userService.getUserO(4L).get(), "Hi!", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(groupChatId).get(), this.userService.getUserO(3L).get(), "Hello!", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(groupChatId).get(), this.userService.getUserO(2L).get(), "Howdy!", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(groupChatId).get(), this.userService.getUserO(1L).get(), "Hail!", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(groupChatId).get(), this.userService.getUserO(1L).get(), "How is project?", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(groupChatId).get(), this.userService.getUserO(2L).get(), "OMG", LocalDateTime.now()));
//    Thread.sleep(2000);
//    this.messageService.save(new Message(this.chatService.findById(groupChatId).get(), this.userService.getUserO(4L).get(), "#sdf%5658**@@@^", LocalDateTime.now()));
//    Thread.sleep(2000);
//  }
//
//  @PostMapping(value = "/initUsers", produces = MediaType.APPLICATION_JSON_VALUE)
//  public void handleInitUsers() {
//    UserModel sample1 = new UserModel();
//    UserModel sample2 = new UserModel();
//    UserModel sample3 = new UserModel();
//    UserModel sample4 = new UserModel();
//    UserModel sample5 = new UserModel();
//
//    sample1.setFullName("User1 Petrovich");
//    sample1.setUserTag("@user1Tag");
//    sample1.setPassword(encoder.encode("11111111"));
//    sample1.setEmail("user1@gmail.com");
//    sample1.setBio("man");
//    sample1.setBirthDate(LocalDate.of(1995, 02, 11));
//    sample1.setLocation("London");
//    sample1.setVerified(true);
//    sample1.setRefreshToken("11111111111");
//
//    sample2.setFullName("User2 Vasilevich");
//    sample2.setUserTag("@user2Tag");
//    sample2.setPassword(encoder.encode("11111111"));
//    sample2.setEmail("user2@gmail.com");
//    sample2.setBio("man");
//    sample2.setBirthDate(LocalDate.of(1985, 05, 12));
//    sample2.setLocation("Kyiv");
//    sample2.setVerified(true);
//    sample2.setRefreshToken("11111111111");
//
//    sample3.setFullName("User3 Genadevich");
//    sample3.setUserTag("@user3Tag");
//    sample3.setPassword(encoder.encode("11111111"));
//    sample3.setEmail("user3@gmail.com");
//    sample3.setBio("man");
//    sample3.setBirthDate(LocalDate.of(1975, 05, 12));
//    sample3.setLocation("Lviv");
//    sample3.setVerified(true);
//    sample3.setRefreshToken("11111111111");
//
//    sample4.setFullName("User4 Mukolaivna");
//    sample4.setUserTag("@user4Tag");
//    sample4.setPassword(encoder.encode("11111111"));
//    sample4.setEmail("user4@gmail.com");
//    sample4.setBio("woman");
//    sample4.setBirthDate(LocalDate.of(2000, 05, 12));
//    sample4.setLocation("Paris");
//    sample4.setVerified(true);
//    sample4.setRefreshToken("11111111111");
//
//    sample5.setFullName("User5 Nikitichna");
//    sample5.setUserTag("@user5Tag");
//    sample5.setPassword(encoder.encode("11111111"));
//    sample5.setEmail("user5@gmail.com");
//    sample5.setBio("woman");
//    sample5.setBirthDate(LocalDate.of(2010, 05, 12));
//    sample5.setLocation("London");
//    sample5.setVerified(true);
//    sample5.setRefreshToken("11111111111");
//
//    this.jwtTokenService.generateTokenPair(this.userService.save(sample1));
//    this.jwtTokenService.generateTokenPair(this.userService.save(sample2));
//    this.jwtTokenService.generateTokenPair(this.userService.save(sample3));
//    this.jwtTokenService.generateTokenPair(this.userService.save(sample4));
//    this.jwtTokenService.generateTokenPair(this.userService.save(sample5));
//  }
//
//  @PostMapping(value = "/initSubscribers")
//  public void handleInitSubscribers() {
//    this.userService.subscribe(1L, 3L);
//    this.userService.subscribe(1L, 4L);
//    this.userService.subscribe(2L, 1L);
//    this.userService.subscribe(3L, 1L);
//    this.userService.subscribe(3L, 4L);
//    this.userService.subscribe(5L, 1L);
//    this.userService.subscribe(5L, 2L);
//    this.userService.subscribe(5L, 3L);
//    this.userService.subscribe(5L, 4L);
//  }
//
//
//  @PostMapping(value = "/initTweets", produces = MediaType.APPLICATION_JSON_VALUE)
//  public void handleInitTweets() {
//    UserModel sample1 = this.userService.getOne(2L);
//    UserModel sample2 = this.userService.getOne(3L);
//    UserModel sample3 = this.userService.getOne(4L);
//    UserModel sample4 = this.userService.getOne(5L);
//    UserModel sample5 = this.userService.getOne(6L);
//    Tweet tweet1 = new Tweet();
//    tweet1.setBody("first tweet with some text");
//    AttachmentImage attachmentImage1 = new AttachmentImage(tweet1, "https://telegraf.com.ua/static/storage/thumbs/1044x587/1/62/86daad98-939aa3eb076510417e7e31a1a9026621.webp");
//    Set<AttachmentImage> attachmentImageSet = new HashSet<>();
//    attachmentImageSet.add(attachmentImage1);
//    tweet1.setAttachmentImages(attachmentImageSet);
//    tweet1.setUser(sample1);
//    tweet1.setTweetType(TweetType.TWEET);
//
//    Tweet tweet2 = new Tweet();
//    tweet2.setBody("Second tweet for sample1");
//    AttachmentImage attachmentImage2 = new AttachmentImage(tweet2, "https://images.unian.net/photos/2022_05/1652013870-1213.jpg");
//    Set<AttachmentImage> attachmentImageSet2 = new HashSet<>();
//    attachmentImageSet2.add(attachmentImage2);
//    tweet2.setAttachmentImages(attachmentImageSet2);
//    tweet2.setUser(sample1);
//    tweet2.setTweetType(TweetType.TWEET);
//
//
//    Tweet tweet3 = new Tweet();
//    tweet3.setBody("Third tweet for sample1");
//    AttachmentImage attachmentImage3 = new AttachmentImage(tweet3, "https://images.unian.net/photos/2022_06/1656498354-6918.jpg");
//    Set<AttachmentImage> attachmentImageSet3 = new HashSet<>();
//    attachmentImageSet3.add(attachmentImage3);
//    tweet3.setAttachmentImages(attachmentImageSet3);
//    tweet3.setUser(sample1);
//    tweet3.setTweetType(TweetType.TWEET);
//
//    Tweet tweet4 = new Tweet();
//    tweet4.setBody("Fourth tweet for sample1");
//    AttachmentImage attachmentImage4 = new AttachmentImage(tweet4, "https://images.unian.net/photos/2022_06/1656498356-7655.jpg");
//    AttachmentImage attachmentImage41 = new AttachmentImage(tweet4, "https://images.unian.net/photos/2022_06/1656496720-6469.jpg");
//    Set<AttachmentImage> attachmentImageSet4 = new HashSet<>();
//    attachmentImageSet4.add(attachmentImage4);
//    attachmentImageSet4.add(attachmentImage41);
//    tweet4.setAttachmentImages(attachmentImageSet4);
//    tweet4.setUser(sample1);
//    tweet4.setTweetType(TweetType.TWEET);
//
//    Tweet tweet5 = new Tweet();
//    tweet5.setBody("Fifth tweet for sample1");
//    AttachmentImage attachmentImage5 = new AttachmentImage(tweet5, "https://images.unian.net/photos/2022_06/1656498357-9174.jpg");
//    Set<AttachmentImage> attachmentImageSet5 = new HashSet<>();
//    attachmentImageSet5.add(attachmentImage5);
//    tweet5.setAttachmentImages(attachmentImageSet5);
//    tweet5.setUser(sample1);
//    tweet5.setTweetType(TweetType.TWEET);
//
//    Tweet tweet6 = new Tweet();
//    tweet6.setBody("Sixth tweet for sample1");
//    AttachmentImage attachmentImage6 = new AttachmentImage(tweet6, "https://images.unian.net/photos/2022_06/1656498358-8955.jpg");
//    Set<AttachmentImage> attachmentImageSet6 = new HashSet<>();
//    attachmentImageSet6.add(attachmentImage6);
//    tweet6.setAttachmentImages(attachmentImageSet6);
//    tweet6.setUser(sample1);
//    tweet6.setTweetType(TweetType.TWEET);
//
//    Tweet tweet7 = new Tweet();
//    tweet7.setBody("Seventh tweet for sample1");
//    AttachmentImage attachmentImage7 = new AttachmentImage(tweet7, "https://images.unian.net/photos/2022_06/1656498359-4116.jpeg");
//    Set<AttachmentImage> attachmentImageSet7 = new HashSet<>();
//    attachmentImageSet7.add(attachmentImage7);
//    tweet7.setAttachmentImages(attachmentImageSet7);
//    tweet7.setUser(sample1);
//    tweet7.setTweetType(TweetType.TWEET);
//
//    Tweet tweet8 = new Tweet();
//    tweet8.setBody("First tweet for sample2");
//    AttachmentImage attachmentImage8 = new AttachmentImage(tweet8, "https://images.unian.net/photos/2022_06/1656498361-1772.jpg");
//    Set<AttachmentImage> attachmentImageSet8 = new HashSet<>();
//    attachmentImageSet8.add(attachmentImage8);
//    tweet8.setAttachmentImages(attachmentImageSet8);
//    tweet8.setUser(sample2);
//    tweet8.setTweetType(TweetType.TWEET);
//
//    Tweet tweet9 = new Tweet();
//    tweet9.setBody("Second tweet for sample2");
//    AttachmentImage attachmentImage9 = new AttachmentImage(tweet9, "https://images.unian.net/photos/2022_06/1656498362-4940.jpg");
//    AttachmentImage attachmentImage91 = new AttachmentImage(tweet8, "https://images.unian.net/photos/2022_06/1656498361-1772.jpg");
//    Set<AttachmentImage> attachmentImageSet9 = new HashSet<>();
//    attachmentImageSet9.add(attachmentImage9);
//    attachmentImageSet9.add(attachmentImage91);
//    tweet9.setAttachmentImages(attachmentImageSet9);
//    tweet9.setUser(sample2);
//    tweet9.setTweetType(TweetType.TWEET);
//
//    Tweet tweet10 = new Tweet();
//    tweet10.setBody("Third tweet for sample2");
//    AttachmentImage attachmentImage10 = new AttachmentImage(tweet10, "https://images.unian.net/photos/2022_06/1656498363-1526.jpg");
//    Set<AttachmentImage> attachmentImageSet10 = new HashSet<>();
//    attachmentImageSet10.add(attachmentImage10);
//    tweet10.setAttachmentImages(attachmentImageSet10);
//    tweet10.setUser(sample2);
//    tweet10.setTweetType(TweetType.TWEET);
//
//    Tweet tweet11 = new Tweet();
//    tweet11.setBody("Fourth tweet for sample2");
//    AttachmentImage attachmentImage11 = new AttachmentImage(tweet11, "https://images.unian.net/photos/2022_06/1656498364-2927.jpg");
//    Set<AttachmentImage> attachmentImageSet11 = new HashSet<>();
//    attachmentImageSet11.add(attachmentImage11);
//    tweet11.setAttachmentImages(attachmentImageSet11);
//    tweet11.setUser(sample2);
//    tweet11.setTweetType(TweetType.TWEET);
//
//    Tweet tweet12 = new Tweet();
//    tweet12.setBody("Fifth tweet for sample2");
//    AttachmentImage attachmentImage12 = new AttachmentImage(tweet12, "https://images.unian.net/photos/2022_06/1656498365-9664.jpg");
//    Set<AttachmentImage> attachmentImageSet12 = new HashSet<>();
//    attachmentImageSet12.add(attachmentImage12);
//    tweet12.setAttachmentImages(attachmentImageSet12);
//    tweet12.setUser(sample2);
//    tweet12.setTweetType(TweetType.TWEET);
//
//    Tweet tweet13 = new Tweet();
//    tweet13.setBody("Sixth tweet for sample2");
//    AttachmentImage attachmentImage13 = new AttachmentImage(tweet13, "https://images.unian.net/photos/2022_06/1656497311-2625.jpg");
//    AttachmentImage attachmentImage131 = new AttachmentImage(tweet13, "https://images.unian.net/photos/2022_06/1656496721-2719.jpg");
//    Set<AttachmentImage> attachmentImageSet13 = new HashSet<>();
//    attachmentImageSet13.add(attachmentImage13);
//    attachmentImageSet13.add(attachmentImage131);
//    tweet13.setAttachmentImages(attachmentImageSet13);
//    tweet13.setUser(sample2);
//    tweet13.setTweetType(TweetType.TWEET);
//
//    Tweet tweet14 = new Tweet();
//    tweet14.setBody("Seventh tweet for sample2");
//    AttachmentImage attachmentImage14 = new AttachmentImage(tweet14, "https://images.unian.net/photos/2022_06/1656497311-5608.jpg");
//    Set<AttachmentImage> attachmentImageSet14 = new HashSet<>();
//    attachmentImageSet14.add(attachmentImage14);
//    tweet14.setAttachmentImages(attachmentImageSet14);
//    tweet14.setUser(sample2);
//    tweet14.setTweetType(TweetType.TWEET);
//
//    Tweet tweet15 = new Tweet();
//    tweet15.setBody("First tweet for sample3");
//    AttachmentImage attachmentImage15 = new AttachmentImage(tweet15, "https://images.unian.net/photos/2022_06/1656497312-3436.jpg");
//    Set<AttachmentImage> attachmentImageSet15 = new HashSet<>();
//    attachmentImageSet15.add(attachmentImage15);
//    tweet15.setAttachmentImages(attachmentImageSet15);
//    tweet15.setUser(sample3);
//    tweet15.setTweetType(TweetType.TWEET);
//
//    Tweet tweet16 = new Tweet();
//    tweet16.setBody("Second tweet for sample3");
//    AttachmentImage attachmentImage16 = new AttachmentImage(tweet16, "https://images.unian.net/photos/2022_06/1656497313-7631.jpg ");
//    Set<AttachmentImage> attachmentImageSet16 = new HashSet<>();
//    attachmentImageSet16.add(attachmentImage16);
//    tweet16.setAttachmentImages(attachmentImageSet16);
//    tweet16.setUser(sample3);
//    tweet16.setTweetType(TweetType.TWEET);
//
//    Tweet tweet17 = new Tweet();
//    tweet17.setBody("First tweet for sample4");
//    AttachmentImage attachmentImage17 = new AttachmentImage(tweet17, "https://images.unian.net/photos/2022_06/1656497314-5114.jpg");
//    Set<AttachmentImage> attachmentImageSet17 = new HashSet<>();
//    attachmentImageSet17.add(attachmentImage17);
//    tweet17.setAttachmentImages(attachmentImageSet17);
//    tweet17.setUser(sample4);
//    tweet17.setTweetType(TweetType.TWEET);
//
//    Tweet tweet18 = new Tweet();
//    tweet18.setBody("Second tweet for sample4");
//    AttachmentImage attachmentImage18 = new AttachmentImage(tweet18, "https://images.unian.net/photos/2022_06/1656497315-9664.jpg");
//    AttachmentImage attachmentImage181 = new AttachmentImage(tweet18, "https://images.unian.net/photos/2022_06/1656497134-7822.jpg");
//    Set<AttachmentImage> attachmentImageSet18 = new HashSet<>();
//    attachmentImageSet18.add(attachmentImage18);
//    attachmentImageSet18.add(attachmentImage181);
//    tweet18.setAttachmentImages(attachmentImageSet18);
//    tweet18.setUser(sample4);
//    tweet18.setTweetType(TweetType.TWEET);
//
//    Tweet tweet19 = new Tweet();
//    tweet19.setBody("Example tweet for sample4");
//    tweet19.setUser(sample4);
//    tweet19.setTweetType(TweetType.TWEET);
//
//    Tweet tweet20 = new Tweet();
//    tweet20.setBody("Example some tweet for sample4");
//    tweet20.setUser(sample4);
//    tweet20.setTweetType(TweetType.TWEET);
//
//    Tweet tweet21 = new Tweet();
//    tweet21.setBody("First tweet for sample5");
//    AttachmentImage attachmentImage21 = new AttachmentImage(tweet21, "https://images.unian.net/photos/2021_08/1629469199-3761.jpg");
//    Set<AttachmentImage> attachmentImageSet21 = new HashSet<>();
//    attachmentImageSet21.add(attachmentImage21);
//    tweet21.setAttachmentImages(attachmentImageSet21);
//    tweet21.setUser(sample5);
//    tweet21.setTweetType(TweetType.TWEET);
//
//    Tweet tweet22 = new Tweet();
//    tweet22.setBody("Second tweet for sample5");
//    AttachmentImage attachmentImage22 = new AttachmentImage(tweet22, "https://images.unian.net/photos/2021_08/1629471815-9795.jpg");
//    Set<AttachmentImage> attachmentImageSet22 = new HashSet<>();
//    attachmentImageSet22.add(attachmentImage22);
//    tweet22.setAttachmentImages(attachmentImageSet22);
//    tweet22.setUser(sample5);
//    tweet22.setTweetType(TweetType.TWEET);
//
//    Tweet tweet23 = new Tweet();
//    tweet23.setBody("Third tweet for sample5");
//    AttachmentImage attachmentImage23 = new AttachmentImage(tweet23, "https://images.unian.net/photos/2020_11/1605089297-6848.jpg");
//    Set<AttachmentImage> attachmentImageSet23 = new HashSet<>();
//    attachmentImageSet23.add(attachmentImage23);
//    tweet23.setAttachmentImages(attachmentImageSet23);
//    tweet23.setUser(sample5);
//    tweet23.setTweetType(TweetType.TWEET);
//
//    Tweet tweet24 = new Tweet();
//    tweet24.setBody("Fourth tweet for sample5");
//    AttachmentImage attachmentImage24 = new AttachmentImage(tweet24, "https://images.unian.net/photos/2022_06/1656496716-2254.jpg");
//    Set<AttachmentImage> attachmentImageSet24 = new HashSet<>();
//    attachmentImageSet24.add(attachmentImage24);
//    tweet24.setAttachmentImages(attachmentImageSet24);
//    tweet24.setUser(sample5);
//    tweet24.setTweetType(TweetType.TWEET);
//
//    Tweet tweet25 = new Tweet();
//    tweet25.setBody("Fifth tweet for sample5");
//    AttachmentImage attachmentImage25 = new AttachmentImage(tweet25, "https://images.unian.net/photos/2022_06/1656496717-1624.jpg");
//    Set<AttachmentImage> attachmentImageSet25 = new HashSet<>();
//    attachmentImageSet25.add(attachmentImage25);
//    tweet25.setAttachmentImages(attachmentImageSet25);
//    tweet25.setUser(sample5);
//    tweet25.setTweetType(TweetType.TWEET);
//
//    Tweet tweet26 = new Tweet();
//    tweet26.setBody("Sixth tweet for sample5");
//    AttachmentImage attachmentImage26 = new AttachmentImage(tweet26, "https://images.unian.net/photos/2022_06/1656496718-3408.jpg");
//    Set<AttachmentImage> attachmentImageSet26 = new HashSet<>();
//    attachmentImageSet26.add(attachmentImage26);
//    tweet26.setAttachmentImages(attachmentImageSet26);
//    tweet26.setUser(sample5);
//    tweet26.setTweetType(TweetType.TWEET);
//
//    Tweet tweet27 = new Tweet();
//    tweet27.setBody("Seventh tweet for sample5");
//    AttachmentImage attachmentImage27 = new AttachmentImage(tweet27, "https://images.unian.net/photos/2022_06/1656496719-6416.jpg");
//    Set<AttachmentImage> attachmentImageSet27 = new HashSet<>();
//    attachmentImageSet27.add(attachmentImage27);
//    tweet27.setAttachmentImages(attachmentImageSet27);
//    tweet27.setUser(sample5);
//    tweet27.setTweetType(TweetType.TWEET);
//
//    TweetAction tweetAction = new TweetAction();
//    tweetAction.setTweet(tweet1);
//    tweetAction.setActionType(TweetActionType.LIKE);
//    tweetAction.setUser(sample1);
//
//    TweetAction tweetAction1 = new TweetAction();
//    tweetAction1.setTweet(tweet1);
//    tweetAction1.setActionType(TweetActionType.LIKE);
//    tweetAction1.setUser(sample1);
//
//    TweetAction tweetAction2 = new TweetAction();
//    tweetAction2.setTweet(tweet2);
//    tweetAction2.setActionType(TweetActionType.LIKE);
//    tweetAction2.setUser(sample1);
//
//    TweetAction tweetAction3 = new TweetAction();
//    tweetAction3.setTweet(tweet3);
//    tweetAction3.setActionType(TweetActionType.LIKE);
//    tweetAction3.setUser(sample1);
//
//    TweetAction tweetAction4 = new TweetAction();
//    tweetAction4.setTweet(tweet1);
//    tweetAction4.setActionType(TweetActionType.LIKE);
//    tweetAction4.setUser(sample2);
//
//    TweetAction tweetAction5 = new TweetAction();
//    tweetAction5.setTweet(tweet2);
//    tweetAction5.setActionType(TweetActionType.LIKE);
//    tweetAction5.setUser(sample2);
//
//    TweetAction tweetAction6 = new TweetAction();
//    tweetAction6.setTweet(tweet3);
//    tweetAction6.setActionType(TweetActionType.LIKE);
//    tweetAction6.setUser(sample2);
//
//    TweetAction tweetAction7 = new TweetAction();
//    tweetAction7.setTweet(tweet7);
//    tweetAction7.setActionType(TweetActionType.LIKE);
//    tweetAction7.setUser(sample1);
//
//    TweetAction tweetAction8 = new TweetAction();
//    tweetAction8.setTweet(tweet7);
//    tweetAction8.setActionType(TweetActionType.LIKE);
//    tweetAction8.setUser(sample2);
//
//    TweetAction tweetAction9 = new TweetAction();
//    tweetAction9.setTweet(tweet7);
//    tweetAction9.setActionType(TweetActionType.LIKE);
//    tweetAction9.setUser(sample3);
//
//    TweetAction tweetAction10 = new TweetAction();
//    tweetAction10.setTweet(tweet10);
//    tweetAction10.setActionType(TweetActionType.LIKE);
//    tweetAction10.setUser(sample1);
//
//    TweetAction tweetAction11 = new TweetAction();
//    tweetAction11.setTweet(tweet11);
//    tweetAction11.setActionType(TweetActionType.LIKE);
//    tweetAction11.setUser(sample2);
//
//    TweetAction tweetAction12 = new TweetAction();
//    tweetAction12.setTweet(tweet12);
//    tweetAction12.setActionType(TweetActionType.LIKE);
//    tweetAction12.setUser(sample3);
//
//    TweetAction tweetAction13 = new TweetAction();
//    tweetAction13.setTweet(tweet13);
//    tweetAction13.setActionType(TweetActionType.LIKE);
//    tweetAction13.setUser(sample4);
//
//    TweetAction tweetAction14 = new TweetAction();
//    tweetAction14.setTweet(tweet14);
//    tweetAction14.setActionType(TweetActionType.LIKE);
//    tweetAction14.setUser(sample5);
//
//    TweetAction tweetAction15 = new TweetAction();
//    tweetAction15.setTweet(tweet15);
//    tweetAction15.setActionType(TweetActionType.LIKE);
//    tweetAction15.setUser(sample1);
//
//    TweetAction tweetAction16 = new TweetAction();
//    tweetAction16.setTweet(tweet16);
//    tweetAction16.setActionType(TweetActionType.LIKE);
//    tweetAction16.setUser(sample2);
//
//    TweetAction tweetAction17 = new TweetAction();
//    tweetAction17.setTweet(tweet17);
//    tweetAction17.setActionType(TweetActionType.LIKE);
//    tweetAction17.setUser(sample3);
//
//    TweetAction tweetAction18 = new TweetAction();
//    tweetAction18.setTweet(tweet18);
//    tweetAction18.setActionType(TweetActionType.LIKE);
//    tweetAction18.setUser(sample4);
//
//    TweetAction tweetAction19 = new TweetAction();
//    tweetAction19.setTweet(tweet19);
//    tweetAction19.setActionType(TweetActionType.LIKE);
//    tweetAction19.setUser(sample5);
//
//    TweetAction tweetAction20 = new TweetAction();
//    tweetAction20.setTweet(tweet20);
//    tweetAction20.setActionType(TweetActionType.LIKE);
//    tweetAction20.setUser(sample1);
//
//    TweetAction tweetAction21 = new TweetAction();
//    tweetAction21.setTweet(tweet21);
//    tweetAction21.setActionType(TweetActionType.LIKE);
//    tweetAction21.setUser(sample2);
//
//    TweetAction tweetAction22 = new TweetAction();
//    tweetAction22.setTweet(tweet22);
//    tweetAction22.setActionType(TweetActionType.LIKE);
//    tweetAction22.setUser(sample3);
//
//    TweetAction tweetAction23 = new TweetAction();
//    tweetAction23.setTweet(tweet23);
//    tweetAction23.setActionType(TweetActionType.LIKE);
//    tweetAction23.setUser(sample4);
//
//    TweetAction tweetAction24 = new TweetAction();
//    tweetAction24.setTweet(tweet24);
//    tweetAction24.setActionType(TweetActionType.LIKE);
//    tweetAction24.setUser(sample5);
//
//    TweetAction tweetAction25 = new TweetAction();
//    tweetAction25.setTweet(tweet25);
//    tweetAction25.setActionType(TweetActionType.LIKE);
//    tweetAction25.setUser(sample1);
//
//    TweetAction tweetAction26 = new TweetAction();
//    tweetAction26.setTweet(tweet26);
//    tweetAction26.setActionType(TweetActionType.LIKE);
//    tweetAction26.setUser(sample2);
//
//    TweetAction tweetAction27 = new TweetAction();
//    tweetAction27.setTweet(tweet27);
//    tweetAction27.setActionType(TweetActionType.LIKE);
//    tweetAction27.setUser(sample3);
//
//    TweetAction tweetAction28 = new TweetAction();
//    tweetAction28.setTweet(tweet23);
//    tweetAction28.setActionType(TweetActionType.LIKE);
//    tweetAction28.setUser(sample1);
//
//    TweetAction tweetAction29 = new TweetAction();
//    tweetAction29.setTweet(tweet24);
//    tweetAction29.setActionType(TweetActionType.LIKE);
//    tweetAction29.setUser(sample2);
//
//    TweetAction tweetAction30 = new TweetAction();
//    tweetAction30.setTweet(tweet25);
//    tweetAction30.setActionType(TweetActionType.LIKE);
//    tweetAction30.setUser(sample3);
//
//    tweetService.save(tweet1);
//    tweetService.save(tweet2);
//    tweetService.save(tweet3);
//    tweetService.save(tweet4);
//    tweetService.save(tweet5);
//    tweetService.save(tweet6);
//    tweetService.save(tweet7);
//    tweetService.save(tweet8);
//    tweetService.save(tweet9);
//    tweetService.save(tweet10);
//    tweetService.save(tweet11);
//    tweetService.save(tweet12);
//    tweetService.save(tweet13);
//    tweetService.save(tweet14);
//    tweetService.save(tweet15);
//    tweetService.save(tweet16);
//    tweetService.save(tweet17);
//    tweetService.save(tweet18);
//    tweetService.save(tweet19);
//    tweetService.save(tweet20);
//    tweetService.save(tweet21);
//    tweetService.save(tweet22);
//    tweetService.save(tweet23);
//    tweetService.save(tweet24);
//    tweetService.save(tweet25);
//    tweetService.save(tweet26);
//    tweetService.save(tweet27);
//    tweetActionService.save(tweetAction1);
//    tweetActionService.save(tweetAction2);
//    tweetActionService.save(tweetAction3);
//    tweetActionService.save(tweetAction4);
//    tweetActionService.save(tweetAction5);
//    tweetActionService.save(tweetAction6);
//    tweetActionService.save(tweetAction7);
//    tweetActionService.save(tweetAction8);
//    tweetActionService.save(tweetAction9);
//    tweetActionService.save(tweetAction10);
//    tweetActionService.save(tweetAction11);
//    tweetActionService.save(tweetAction12);
//    tweetActionService.save(tweetAction13);
//    tweetActionService.save(tweetAction14);
//    tweetActionService.save(tweetAction15);
//    tweetActionService.save(tweetAction16);
//    tweetActionService.save(tweetAction17);
//    tweetActionService.save(tweetAction18);
//    tweetActionService.save(tweetAction19);
//    tweetActionService.save(tweetAction20);
//    tweetActionService.save(tweetAction21);
//    tweetActionService.save(tweetAction22);
//    tweetActionService.save(tweetAction23);
//    tweetActionService.save(tweetAction24);
//    tweetActionService.save(tweetAction25);
//    tweetActionService.save(tweetAction26);
//    tweetActionService.save(tweetAction27);
//    tweetActionService.save(tweetAction28);
//    tweetActionService.save(tweetAction29);
//    tweetActionService.save(tweetAction30);
//  }
//
////  @PostMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
////  public List<Page> handleSearch(HttpServletRequest request,
////                                 @RequestParam("page") @NotNull @Positive Integer page,
////                                 @RequestParam("pageSize") @NotNull @Positive Integer pageSize,
////                                 @RequestParam("keyword") @NotNull String keyword,
////                                 @RequestParam("id") Long currUserId) {
////    return this.chatService.getSearchResult(currUserId, pageSize, page, keyword);
////  }
//}
