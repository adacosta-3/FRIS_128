package fris.dev.backend.controllers;

import fris.dev.backend.DTO.AuthorshipDto;
import fris.dev.backend.entities.Authorship;
import fris.dev.backend.service.AuthorshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authorship")
@RequiredArgsConstructor
public class AuthorshipController {

    private final AuthorshipService service;

    @PostMapping
    public ResponseEntity<Authorship> add(@RequestBody AuthorshipDto dto) {
        return ResponseEntity.ok(service.add(dto));
    }

    @GetMapping("/teaching/{teachingId}")
    public ResponseEntity<List<Authorship>> getByTeaching(@PathVariable Long teachingId) {
        return ResponseEntity.ok(service.getByTeachingId(teachingId));
    }
}

