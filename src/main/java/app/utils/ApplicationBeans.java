package app.utils;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Properties;


@Configuration
public class ApplicationBeans {
  @Value("${cloudinary.cloudName}")
  private String cloudName;

  @Value("${cloudinary.apiKey}")
  private String apiKey;

  @Value("${cloudinary.apiSecret}")
  private String apiSecret;

  @Value("${spring.mail.password}")
  private String mailPass;

  @Bean
  public ModelMapper modelMapper() {
    ModelMapper mm = new ModelMapper();
    mm.getConfiguration().setFieldMatchingEnabled(true).setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);
    // Skip properties with null value
    mm.getConfiguration().setPropertyCondition(u -> u.getSource() != null);
    return mm;
  }

  @Bean
  public Validator validator() {
    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    return factory.getValidator();
  }

  @Bean
  public WebSocketStompClient WebSocketStompClient() {
    WebSocketClient webSocketClient = new StandardWebSocketClient();
    WebSocketStompClient stompClient = new WebSocketStompClient(webSocketClient);
    stompClient.setMessageConverter(new MappingJackson2MessageConverter());
    return stompClient;
  }

  @Bean
  public JavaMailSender getJavaMailSender() {
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    mailSender.setHost("smtp.gmail.com");
    mailSender.setPort(587);

    mailSender.setUsername("fe8fs2finalstep@gmail.com");
    mailSender.setPassword(mailPass);

    Properties props = mailSender.getJavaMailProperties();
    props.put("mail.transport.protocol", "smtp");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.debug", "true");

    return mailSender;
  }

  @Bean
  public Cloudinary cloudinaryConfig() {
    Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
      "cloud_name", cloudName,
      "api_key", apiKey,
      "api_secret", apiSecret,
      "secure", true));

    //Sync upload from byte array and get url
    //byte[] imageByteArray = new byte[1024]; // there will be parsing request body to get byte array
    //try (InputStream is = new ByteArrayInputStream(imageByteArray)) {
    //  String cloudinaryUrl = cloudinary.uploader().upload(is, ObjectUtils.asMap("public_id", "someImageName")).get("url").toString();
    //} catch (IOException exception) {
    //  System.out.println(exception.getMessage());

    //Sync upload and get url
    //    try {
    //      System.out.println("Image can be accessed via link: " + cloudinary.uploader().upload("https://upload.wikimedia.org/wikipedia/ru/2/2a/Adventure_Time_with_Finn_%26_Jake.png",
    //        ObjectUtils.asMap("public_id", "Adventure time!")).get("url"));
    //    } catch (IOException exception) {
    //      System.out.println(exception.getMessage());
    //
    //    }

    //Async upload and get url (but need to listen notification url and parse JSON to get image url)
    //    try {
    //      System.out.println("Image can be accessed via link: " + cloudinary.uploader().upload("https://hips.hearstapps.com/digitalspyuk.cdnds.net/15/49/1448878006-alien-xenomorph.jpeg",
    //        ObjectUtils.asMap("public_id", "Alien", "eager_async", true,
    //          "eager_notification_url", "https://mysite.example.com/notify_endpoint")).get("url"));
    //    } catch (IOException exception) {
    //      System.out.println(exception.getMessage());
    //    }

    //Get TAG URL
    //System.out.println(cloudinary.url().imageTag("Adventure time!"));

    // Transform
    //    String url = cloudinary.url().transformation(new Transformation().width(100).height(150).crop("fill")).generate("Adventure time!");
    //    System.out.println(url);
    //
    //  }
    return cloudinary;
  }
}