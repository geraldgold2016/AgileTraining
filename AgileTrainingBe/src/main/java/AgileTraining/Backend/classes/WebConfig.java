package AgileTraining.Backend.classes;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//        @Override
//        public void addCorsMappings(CorsRegistry registry) {
//            registry.addMapping("/**")
//                    .allowedOrigins("http://localhost:4200") // Adjust this to your frontend's actual origin
//                    .allowedMethods("GET", "POST", "PUT", "DELETE")
//                    .allowedHeaders("*")
//                    .allowCredentials(true)
//                    .maxAge(3600); // 1 hour
//        }
//    }
//
//
//
//@Configuration
//public class WebConfig {
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**").allowedOrigins("http://localhost:4200");
//            }
//        };
//    }
//}