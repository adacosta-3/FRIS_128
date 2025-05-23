package fris.dev.backend.controllers;

import fris.dev.backend.DTO.ApprovalPathDto;
import fris.dev.backend.entities.ApprovalPath;
import fris.dev.backend.service.ApprovalPathService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/approval-paths")
@RequiredArgsConstructor
public class ApprovalPathController {

    private final ApprovalPathService approvalPathService;

    @PostMapping
    public ResponseEntity<ApprovalPath> create(@RequestBody ApprovalPathDto dto) {
        return ResponseEntity.ok(approvalPathService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<ApprovalPath>> getAll() {
        return ResponseEntity.ok(approvalPathService.getAll());
    }
}
