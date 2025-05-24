package fris.dev.backend.controllers;

import fris.dev.backend.DTO.ApprovalPathAssignmentDto;
import fris.dev.backend.entities.ApprovalPathAssignment;
import fris.dev.backend.service.ApprovalPathAssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/approval-path-assignments")
@RequiredArgsConstructor
public class ApprovalPathAssignmentController {

    private final ApprovalPathAssignmentService service;

    @PostMapping
    public ResponseEntity<ApprovalPathAssignment> assignPath(@RequestBody ApprovalPathAssignmentDto dto) {
        return ResponseEntity.ok(service.assignPath(dto));
    }

    @GetMapping
    public ResponseEntity<ApprovalPathAssignment> getAssignment(
            @RequestParam Long roleRankId,
            @RequestParam String college,
            @RequestParam String department
    ) {
        return service.findAssignment(roleRankId, college, department)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
