package fris.dev.backend.controllers;

import fris.dev.backend.DTO.PublicServiceDto;
import fris.dev.backend.entities.PublicService;
import fris.dev.backend.service.PublicServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public-service")
@RequiredArgsConstructor
public class PublicServiceController {

    private final PublicServiceService service;

    @PostMapping
    public ResponseEntity<PublicService> create(@RequestBody PublicServiceDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PublicService>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUser(userId));
    }

    @GetMapping("/approved")
    public ResponseEntity<List<PublicService>> getApproved() {
        return ResponseEntity.ok(service.getApproved());
    }
}