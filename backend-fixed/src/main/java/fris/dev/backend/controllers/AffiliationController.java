package fris.dev.backend.controllers;

import fris.dev.backend.DTO.AffiliationDto;
import fris.dev.backend.service.AffiliationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/affiliations")
@RequiredArgsConstructor
public class AffiliationController {

    private final AffiliationService affiliationService;

    @PostMapping
    public ResponseEntity<AffiliationDto> add(@RequestBody AffiliationDto dto, Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.ok(affiliationService.add(dto, username));
    }

    @GetMapping
    public ResponseEntity<List<AffiliationDto>> getAll(Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.ok(affiliationService.getAll(username));
    }

    @PutMapping
    public ResponseEntity<AffiliationDto> update(@RequestBody AffiliationDto dto, Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.ok(affiliationService.update(dto, username));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication auth) {
        String username = auth.getName();
        affiliationService.delete(id, username);
        return ResponseEntity.noContent().build();
    }
}
