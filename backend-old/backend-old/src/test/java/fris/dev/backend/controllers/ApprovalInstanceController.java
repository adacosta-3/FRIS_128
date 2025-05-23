package fris.dev.backend.controllers;

import fris.dev.backend.DTO.ApprovalInstanceDto;
import fris.dev.backend.entities.ApprovalInstance;
import fris.dev.backend.service.ApprovalInstanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/approval-instances")
@RequiredArgsConstructor
public class ApprovalInstanceController {

    private final ApprovalInstanceService approvalInstanceService;

    @PostMapping
    public ResponseEntity<ApprovalInstance> create(@RequestBody ApprovalInstanceDto dto) {
        return ResponseEntity.ok(approvalInstanceService.createInstance(dto));
    }

    @GetMapping("/submission/{submissionId}")
    public ResponseEntity<List<ApprovalInstance>> getBySubmission(@PathVariable Long submissionId) {
        return ResponseEntity.ok(approvalInstanceService.getBySubmissionId(submissionId));
    }
}

