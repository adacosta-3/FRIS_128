package fris.dev.backend.controllers;

import fris.dev.backend.DTO.ApprovalDecisionDto;
import fris.dev.backend.entities.ApprovalDecision;
import fris.dev.backend.service.ApprovalDecisionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/approval-decisions")
@RequiredArgsConstructor
public class ApprovalDecisionController {

    private final ApprovalDecisionService decisionService;

    @PostMapping
    public ResponseEntity<ApprovalDecision> logDecision(@RequestBody ApprovalDecisionDto dto) {
        return ResponseEntity.ok(decisionService.logDecision(dto));
    }

    @GetMapping("/instance/{instanceId}")
    public ResponseEntity<List<ApprovalDecision>> getByInstance(@PathVariable Long instanceId) {
        return ResponseEntity.ok(decisionService.getByInstanceId(instanceId));
    }

    @PostMapping("/action")
    public ResponseEntity<ApprovalDecision> handleAction(@RequestBody ApprovalDecisionDto dto) {
        return ResponseEntity.ok(decisionService.handleApprovalAction(dto));
    }

}
