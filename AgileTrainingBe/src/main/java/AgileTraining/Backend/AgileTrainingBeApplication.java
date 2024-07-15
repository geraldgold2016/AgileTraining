package AgileTraining.Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.security.SecureRandom;

@SpringBootApplication
public class AgileTrainingBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgileTrainingBeApplication.class, args);
	}
	@Bean
	BCryptPasswordEncoder encoder() {
		return new BCryptPasswordEncoder(12, new SecureRandom());
	}

}
