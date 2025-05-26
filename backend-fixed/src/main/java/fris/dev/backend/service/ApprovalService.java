package fris.dev.backend.service;

import fris.dev.backend.DTO.ApprovalInstanceDto;
import fris.dev.backend.DTO.PendingApprovalDto;

import java.util.List;

public interface ApprovalService {
    List<PendingApprovalDto> getPendingApprovalsForUser(String username);

    PendingApprovalDto getPendingApprovalBySubmissionId(Long submissionId);
}


