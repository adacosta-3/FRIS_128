package fris.dev.backend.controllers;

import fris.dev.backend.entities.SDGTarget;
import fris.dev.backend.service.SDGTargetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sdg-targets")
@RequiredArgsConstructor
public class SDGTargetController {

    private final SDGTargetService sdgTargetService;

    @PostMapping
    public ResponseEntity<SDGTarget> createSDGTarget(@RequestParam Long sdgId, @RequestParam String name) {
        return ResponseEntity.ok(sdgTargetService.createSDGTarget(sdgId, name));
    }

    @GetMapping("/by-sdg/{sdgId}")
    public ResponseEntity<List<SDGTarget>> getTargetsBySDG(@PathVariable Long sdgId) {
        return ResponseEntity.ok(sdgTargetService.getTargetsBySDG(sdgId));
    }
}

