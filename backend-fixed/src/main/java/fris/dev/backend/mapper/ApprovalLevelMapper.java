package fris.dev.backend.mapper;

import fris.dev.backend.DTO.ApprovalLevelDto;
import fris.dev.backend.entities.ApprovalLevel;
import fris.dev.backend.entities.ApprovalPath;
import fris.dev.backend.entities.RoleRank;
import fris.dev.backend.repositories.ApprovalPathRepository;
import fris.dev.backend.repositories.RoleRankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ApprovalLevelMapper {

    private final ApprovalPathRepository approvalPathRepository;
    private final RoleRankRepository roleRankRepository;

    public ApprovalLevel toEntity(ApprovalLevelDto dto) {
        ApprovalPath path = approvalPathRepository.findById(dto.getPathId())
                .orElseThrow(() -> new IllegalArgumentException("Approval path not found"));

        RoleRank roleRank = roleRankRepository.findById(dto.getRoleRankId())
                .orElseThrow(() -> new IllegalArgumentException("Role rank not found"));

        return new ApprovalLevel(null, path, dto.getLevelOrder(), roleRank, dto.getScope(), dto.getDeadlineDays());
    }
}