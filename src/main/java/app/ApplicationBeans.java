//package app;
//
//import com.cloudinary.Cloudinary;
//import org.h2.tools.Server;
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Profile;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Configuration
//public class ApplicationBeans {
//  @Value("${cloudinary.cloudName}")
//  private String cloudName;
//
//  @Value("${cloudinary.apiKey}")
//  private String apiKey;
//
//  @Value("${cloudinary.apiSecret}")
//  private String apiSecret;
//
//  @Bean
//  public ModelMapper modelMapper() {
//    ModelMapper mm = new ModelMapper();
//    mm.getConfiguration().setFieldMatchingEnabled(true).setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);
//    return mm;
//  }
//
//  @Profile("local")
//  @Bean
//  Server h2Server() {
//    Server server = new Server();
//    try {
//      server.runTool("-tcp");
//      server.runTool("-tcpAllowOthers");
//    } catch (Exception e) {
//      e.printStackTrace();
//    }
//    return server;
//
//  }
//
//  @Bean
//  public Cloudinary cloudinaryConfig() {
//    Cloudinary cloudinary;
//    Map<String, String> config = new HashMap<>();
//    config.put("cloud_name", cloudName);
//    config.put("api_key", apiKey);
//    config.put("api_secret", apiSecret);
//    cloudinary = new Cloudinary(config);
//    return cloudinary;
//  }
//}