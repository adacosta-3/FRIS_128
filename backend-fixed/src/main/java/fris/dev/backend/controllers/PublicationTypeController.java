package fris.dev.backend.controllers;

import fris.dev.backend.DTO.PublicationTypeDto;
import fris.dev.backend.entities.PublicationType;
import fris.dev.backend.service.PublicationTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publication-types")
@RequiredArgsConstructor
public class PublicationTypeController {

    private final PublicationTypeService service;

    @PostMapping
    public ResponseEntity<PublicationType> create(@RequestBody PublicationTypeDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<PublicationType>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}
