package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


/**
 * Main app launcher
 */
@SpringBootApplication
@EnableJpaAuditing
public class Launcher {
  public static void main(String[] args) {
    SpringApplication.run(Launcher.class, args);
  }
}
