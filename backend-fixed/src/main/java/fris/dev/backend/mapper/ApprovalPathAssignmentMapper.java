package fris.dev.backend.mapper;

import fris.dev.backend.DTO.ApprovalPathAssignmentDto;
import fris.dev.backend.entities.ApprovalPath;
import fris.dev.backend.entities.ApprovalPathAssignment;
import fris.dev.backend.entities.RoleRank;
import fris.dev.backend.repositories.ApprovalPathRepository;
import fris.dev.backend.repositories.RoleRankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ApprovalPathAssignmentMapper {

    private final RoleRankRepository roleRankRepository;
    private final ApprovalPathRepository approvalPathRepository;

    public ApprovalPathAssignment toEntity(ApprovalPathAssignmentDto dto) {
        RoleRank role = roleRankRepository.findById(dto.getRoleRankId())
                .orElseThrow(() -> new IllegalArgumentException("RoleRank not found"));

        ApprovalPath path = approvalPathRepository.findById(dto.getPathId())
                .orElseThrow(() -> new IllegalArgumentException("ApprovalPath not found"));

        return new ApprovalPathAssignment(null, role, dto.getCollege(), dto.getDepartment(), path);
    }
}
