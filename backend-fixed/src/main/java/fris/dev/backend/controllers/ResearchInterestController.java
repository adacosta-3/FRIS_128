package fris.dev.backend.controllers;

import fris.dev.backend.DTO.ResearchInterestDto;
import fris.dev.backend.service.ResearchInterestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/research-interests")
@RequiredArgsConstructor
public class ResearchInterestController {

    private final ResearchInterestService service;

    @PostMapping
    public ResponseEntity<ResearchInterestDto> add(@RequestBody ResearchInterestDto dto, Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.ok(service.add(dto, username));
    }

    @GetMapping
    public ResponseEntity<List<ResearchInterestDto>> getAll(Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.ok(service.getAll(username));
    }

    @PutMapping
    public ResponseEntity<ResearchInterestDto> update(@RequestBody ResearchInterestDto dto, Authentication auth) {
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

