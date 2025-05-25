package fris.dev.backend.controllers;

import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.GoogleScholarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/google-scholar")
@RequiredArgsConstructor
public class GoogleScholarController {

    private final GoogleScholarService googleScholarService;
    private final UserRepository userRepository;

    // Update Google Scholar profile URL for logged-in user
    @PostMapping("/profile-url")
    public ResponseEntity<?> updateProfileUrl(
            @RequestParam String profileUrl,
            Authentication authentication) {

        String username = authentication.getName();
        googleScholarService.updateGoogleScholarProfile(username, profileUrl);

        return ResponseEntity.ok("Google Scholar profile URL updated.");
    }

    // Trigger import of Google Scholar publications for logged-in user
    @PostMapping("/import")
    public ResponseEntity<?> importPublications(Authentication authentication) {
        String username = authentication.getName();
        googleScholarService.importGoogleScholarPublications(username);

        return ResponseEntity.ok("Google Scholar publications imported.");
    }

    @PostMapping("/link")
    public ResponseEntity<?> linkGoogleScholarProfile(
            @RequestParam String googleScholarProfileUrl,
            Authentication authentication) {

        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setGoogleScholarProfileUrl(googleScholarProfileUrl);
        userRepository.save(user);

        return ResponseEntity.ok("Google Scholar profile linked successfully.");
    }
}
