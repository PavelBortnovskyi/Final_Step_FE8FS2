package app;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.Files;
import jdk.swing.interop.SwingInterOpUtils;
import org.h2.tools.Server;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class ApplicationBeans {
  @Value("${cloudinary.cloudName}")
  private String cloudName;

  @Value("${cloudinary.apiKey}")
  private String apiKey;

  @Value("${cloudinary.apiSecret}")
  private String apiSecret;

  @Bean
  public ModelMapper modelMapper() {
    ModelMapper mm = new ModelMapper();
    mm.getConfiguration().setFieldMatchingEnabled(true).setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);
    return mm;
  }

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
//  }

  @Bean
  public Cloudinary cloudinaryConfig() throws IOException {
    Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
      "cloud_name", cloudName,
      "api_key", apiKey,
      "api_secret", apiSecret,
      "secure", true));


    //upload from byte array that given by front end side
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