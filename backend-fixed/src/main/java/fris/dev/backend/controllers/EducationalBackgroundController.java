package fris.dev.backend.controllers;

import fris.dev.backend.DTO.EducationalBackgroundDto;
import fris.dev.backend.service.EducationalBackgroundService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/educational-background")
@RequiredArgsConstructor
public class EducationalBackgroundController {

    private final EducationalBackgroundService service;

    @PostMapping
    public ResponseEntity<EducationalBackgroundDto> add(@RequestBody EducationalBackgroundDto dto, Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.ok(service.add(dto, username));
    }

    @GetMapping
    public ResponseEntity<List<EducationalBackgroundDto>> getAll(Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.ok(service.getAll(username));
    }

    @PutMapping
    public ResponseEntity<EducationalBackgroundDto> update(@RequestBody EducationalBackgroundDto dto, Authentication auth) {
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

