//package app.utils;
//
//import app.annotations.Marker;
//import com.fasterxml.jackson.annotation.JsonInclude;
//import com.fasterxml.jackson.databind.MapperFeature;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
//
//@Configuration
//public class ObjectMapperConfig {
//
//  @Bean
//  public ObjectMapper objectMapper() {
//    ObjectMapper objectMapper = new ObjectMapper();
//
//    objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
//    objectMapper.setDefaultPropertyInclusion(JsonInclude.Include.NON_NULL);
//
//    objectMapper
//      .setConfig(objectMapper.getSerializationConfig()
//        .withView(Marker.New.class))
//      .setConfig(objectMapper.getSerializationConfig()
//        .withView(Marker.Existed.class))
//      .setConfig(objectMapper.getSerializationConfig()
//        .withView(Marker.Details.class))
//      .setConfig(objectMapper.getSerializationConfig()
//        .withView(Marker.ChatDetails.class))
//      .setConfig(objectMapper.getSerializationConfig()
//        .withView(Marker.Preview.class))
//      .setConfig(objectMapper.getSerializationConfig()
//        .withView(Marker.Delete.class))
//      .setConfig(objectMapper.getSerializationConfig()
//        .withView(Marker.Update.class))
//      .setConfig(objectMapper.getSerializationConfig()
//        .withView(Marker.Retweet.class))
//      .setConfig(objectMapper.getSerializationConfig()
//        .withView(Marker.PasswordUpdate.class))
//      .setConfig(objectMapper.getSerializationConfig()
//        .withView(Marker.PasswordUpdateAfterReset.class))
//      .setConfig(objectMapper.getSerializationConfig()
//        .withView(Marker.PasswordReset.class));
//
//    objectMapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);
//
//    return objectMapper;
//  }
//
//  @Bean
//  public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter(ObjectMapper objectMapper) {
//    MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
//    converter.setObjectMapper(objectMapper);
//    return converter;
//  }
//}
//
//
