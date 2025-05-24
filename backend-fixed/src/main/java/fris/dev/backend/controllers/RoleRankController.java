package fris.dev.backend.controllers;

import fris.dev.backend.DTO.RoleRankDto;
import fris.dev.backend.entities.RoleRank;
import fris.dev.backend.service.RoleRankService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleRankController {

    private final RoleRankService roleRankService;

    @PostMapping
    public ResponseEntity<RoleRank> create(@RequestBody RoleRankDto dto) {
        return ResponseEntity.ok(roleRankService.createRoleRank(dto));
    }

    @GetMapping
    public ResponseEntity<List<RoleRank>> getAll() {
        return ResponseEntity.ok(roleRankService.getAll());
    }

    @GetMapping("/{name}")
    public ResponseEntity<RoleRank> getByName(@PathVariable String name) {
        return roleRankService.getByName(name)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
