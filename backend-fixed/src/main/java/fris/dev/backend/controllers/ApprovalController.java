package fris.dev.backend.controllers;

import fris.dev.backend.DTO.ApprovalInstanceDto;
import fris.dev.backend.DTO.PendingApprovalDto;
import fris.dev.backend.service.ApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/approvals")
@RequiredArgsConstructor
public class ApprovalController {

    private final ApprovalService approvalService;

    @GetMapping("/pending")
    public ResponseEntity<List<PendingApprovalDto>> getPendingApprovals(Authentication authentication) {
        String username = authentication.getName();
        List<PendingApprovalDto> pendingApprovals = approvalService.getPendingApprovalsForUser(username);
        return ResponseEntity.ok(pendingApprovals);
    }

    @GetMapping("/pending/{submissionId}")
    public ResponseEntity<PendingApprovalDto> getPendingApproval(@PathVariable Long submissionId) {
        PendingApprovalDto dto = approvalService.getPendingApprovalBySubmissionId(submissionId);
        return ResponseEntity.ok(dto);
    }
}



