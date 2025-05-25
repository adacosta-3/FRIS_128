package fris.dev.backend.controllers;

import fris.dev.backend.DTO.ResearchExperienceDto;
import fris.dev.backend.service.ResearchExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/research-experiences")
@RequiredArgsConstructor
public class ResearchExperienceController {

    private final ResearchExperienceService service;

    @PostMapping
    public ResponseEntity<ResearchExperienceDto> add(@RequestBody ResearchExperienceDto dto, Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.ok(service.add(dto, username));
    }

    @GetMapping
    public ResponseEntity<List<ResearchExperienceDto>> getAll(Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.ok(service.getAll(username));
    }

    @PutMapping
    public ResponseEntity<ResearchExperienceDto> update(@RequestBody ResearchExperienceDto dto, Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.ok(service.update(dto, username));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication auth) {
        String username = auth.getName();
        service.delete(id, username);
        return ResponseEntity.noContent().build();
    }
}

