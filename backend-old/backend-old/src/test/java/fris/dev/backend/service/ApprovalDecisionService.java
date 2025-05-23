package fris.dev.backend.service;

import fris.dev.backend.DTO.ApprovalDecisionDto;
import fris.dev.backend.entities.ApprovalDecision;

import java.util.List;

public interface ApprovalDecisionService {
    ApprovalDecision logDecision(ApprovalDecisionDto dto);
    List<ApprovalDecision> getByInstanceId(Long instanceId);
    ApprovalDecision handleApprovalAction(ApprovalDecisionDto dto);

}

