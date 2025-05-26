package fris.dev.backend;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")              // Allow all /api/** endpoints
                .allowedOrigins("http://localhost:3000") // Allow calls from React dev server
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowCredentials(true)                  // Allow cookies (if using session auth)
                .maxAge(3600);                           // Cache preflight for 1 hour
    }
}
