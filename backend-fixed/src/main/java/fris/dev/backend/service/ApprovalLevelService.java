package fris.dev.backend.service;

import fris.dev.backend.DTO.ApprovalLevelDto;
import fris.dev.backend.entities.ApprovalLevel;

import java.util.List;

public interface ApprovalLevelService {
    ApprovalLevel create(ApprovalLevelDto dto);
    List<ApprovalLevel> getByPathId(Long pathId);
}
