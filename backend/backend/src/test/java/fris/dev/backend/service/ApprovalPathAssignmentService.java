package fris.dev.backend.service;

import fris.dev.backend.DTO.ApprovalPathAssignmentDto;
import fris.dev.backend.entities.ApprovalPathAssignment;

import java.util.Optional;

public interface ApprovalPathAssignmentService {
    ApprovalPathAssignment assignPath(ApprovalPathAssignmentDto dto);
    Optional<ApprovalPathAssignment> findAssignment(Long roleRankId, String college, String department);
}
