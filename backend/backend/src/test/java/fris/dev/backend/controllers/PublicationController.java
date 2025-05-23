package fris.dev.backend.controllers;

import fris.dev.backend.DTO.PublicationDto;
import fris.dev.backend.entities.Publication;
import fris.dev.backend.service.PublicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publications")
@RequiredArgsConstructor
public class PublicationController {

    private final PublicationService publicationService;

    @PostMapping
    public ResponseEntity<Publication> submit(@RequestBody PublicationDto dto) {
        return ResponseEntity.ok(publicationService.submitPublication(dto));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Publication>> getUserPublications(@PathVariable Long userId) {
        return ResponseEntity.ok(publicationService.getUserPublications(userId));
    }

    @GetMapping("/approved")
    public ResponseEntity<List<Publication>> getApprovedPublications() {
        return ResponseEntity.ok(publicationService.getApprovedPublications());
    }
}

