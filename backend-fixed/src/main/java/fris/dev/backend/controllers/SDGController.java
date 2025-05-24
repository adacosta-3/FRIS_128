package fris.dev.backend.controllers;

import fris.dev.backend.entities.SDG;
import fris.dev.backend.entities.SDGTarget;
import fris.dev.backend.service.SDGService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sdg")
@RequiredArgsConstructor
public class SDGController {

    private final SDGService sdgService;

    @PostMapping("/target")
    public ResponseEntity<SDGTarget> createTarget(@RequestParam String name) {
        return ResponseEntity.ok(sdgService.createTarget(name));
    }

    @PostMapping
    public ResponseEntity<SDG> createSDG(@RequestParam Long targetId, @RequestParam String name) {
        return ResponseEntity.ok(sdgService.createSDG(targetId, name));
    }

    @GetMapping("/target/{targetId}")
    public ResponseEntity<List<SDG>> getByTarget(@PathVariable Long targetId) {
        return ResponseEntity.ok(sdgService.getByTarget(targetId));
    }
}
