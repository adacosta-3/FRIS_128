package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.ApprovalPathAssignmentDto;
import fris.dev.backend.entities.ApprovalPathAssignment;
import fris.dev.backend.entities.RoleRank;
import fris.dev.backend.mapper.ApprovalPathAssignmentMapper;
import fris.dev.backend.repositories.ApprovalPathAssignmentRepository;
import fris.dev.backend.repositories.RoleRankRepository;
import fris.dev.backend.service.ApprovalPathAssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ApprovalPathAssignmentServiceImpl implements ApprovalPathAssignmentService {

    private final ApprovalPathAssignmentRepository assignmentRepository;
    private final ApprovalPathAssignmentMapper assignmentMapper;
    private final RoleRankRepository roleRankRepository;

    @Override
    public ApprovalPathAssignment assignPath(ApprovalPathAssignmentDto dto) {
        return assignmentRepository.save(assignmentMapper.toEntity(dto));
    }

    @Override
    public Optional<ApprovalPathAssignment> findAssignment(Long roleRankId, String college, String department) {
        RoleRank roleRank = roleRankRepository.findById(roleRankId)
                .orElseThrow(() -> new IllegalArgumentException("RoleRank not found"));
        return assignmentRepository.findByRoleRankAndCollegeAndDepartment(roleRank, college, department);
    }
}