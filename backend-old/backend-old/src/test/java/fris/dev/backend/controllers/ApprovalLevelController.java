package fris.dev.backend.controllers;

import fris.dev.backend.DTO.ApprovalLevelDto;
import fris.dev.backend.entities.ApprovalLevel;
import fris.dev.backend.service.ApprovalLevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/approval-levels")
@RequiredArgsConstructor
public class ApprovalLevelController {

    private final ApprovalLevelService approvalLevelService;

    @PostMapping
    public ResponseEntity<ApprovalLevel> create(@RequestBody ApprovalLevelDto dto) {
        return ResponseEntity.ok(approvalLevelService.create(dto));
    }

    @GetMapping("/path/{pathId}")
    public ResponseEntity<List<ApprovalLevel>> getByPath(@PathVariable Long pathId) {
        return ResponseEntity.ok(approvalLevelService.getByPathId(pathId));
    }
}

