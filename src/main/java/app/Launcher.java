package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

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
