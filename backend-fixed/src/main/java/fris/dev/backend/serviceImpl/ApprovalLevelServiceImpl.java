package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.ApprovalLevelDto;
import fris.dev.backend.entities.ApprovalLevel;
import fris.dev.backend.entities.ApprovalPath;
import fris.dev.backend.mapper.ApprovalLevelMapper;
import fris.dev.backend.repositories.ApprovalLevelRepository;
import fris.dev.backend.repositories.ApprovalPathRepository;
import fris.dev.backend.service.ApprovalLevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApprovalLevelServiceImpl implements ApprovalLevelService {

    private final ApprovalLevelRepository approvalLevelRepository;
    private final ApprovalLevelMapper approvalLevelMapper;
    private final ApprovalPathRepository approvalPathRepository;

    @Override
    public ApprovalLevel create(ApprovalLevelDto dto) {
        return approvalLevelRepository.save(approvalLevelMapper.toEntity(dto));
    }

    @Override
    public List<ApprovalLevel> getByPathId(Long pathId) {
        ApprovalPath path = approvalPathRepository.findById(pathId)
                .orElseThrow(() -> new IllegalArgumentException("Approval path not found"));
        return approvalLevelRepository.findByApprovalPathOrderByLevelOrderAsc(path);
    }
}
