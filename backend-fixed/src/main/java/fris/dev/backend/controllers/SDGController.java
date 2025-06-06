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

    @PostMapping
    public ResponseEntity<SDG> createSDG(@RequestParam String name) {
        return ResponseEntity.ok(sdgService.createSDG(name));
    }

    @GetMapping
    public ResponseEntity<List<SDG>> getAll() {
        return ResponseEntity.ok(sdgService.getAllSDGs());
    }
}

