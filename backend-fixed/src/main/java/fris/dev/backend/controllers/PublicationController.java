package fris.dev.backend.controllers;

import fris.dev.backend.DTO.PublicationDto;
import fris.dev.backend.DTO.PublicationResponseDto;
import fris.dev.backend.entities.Publication;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.PublicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publications")
@RequiredArgsConstructor
public class PublicationController {

    private final PublicationService publicationService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Publication> submit(@RequestBody PublicationDto dto) {
        return ResponseEntity.ok(publicationService.submitPublication(dto));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Publication>> getUserPublications(@PathVariable Long userId) {
        return ResponseEntity.ok(publicationService.getUserPublications(userId));
    }

//    @GetMapping("/approved")
//    public ResponseEntity<List<Publication>> getApprovedPublications() {
//        return ResponseEntity.ok(publicationService.getApprovedPublications());
//    }

    @GetMapping("/approved")
    public ResponseEntity<List<PublicationResponseDto>> getApprovedForCurrentUser(Authentication authentication) {
        // Assumes Spring Security with username as principal
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<PublicationResponseDto> dtos = publicationService.getApprovedPublicationsByUser(user.getUserId());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/approved/filter")
    public ResponseEntity<List<PublicationResponseDto>> getApprovedFiltered(
            @RequestParam(required = false) Long publicationTypeId,
            Authentication authentication) {

        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<PublicationResponseDto> dtos = publicationService.getApprovedPublicationsByUserAndType(user.getUserId(), publicationTypeId);

        return ResponseEntity.ok(dtos);
    }
}
