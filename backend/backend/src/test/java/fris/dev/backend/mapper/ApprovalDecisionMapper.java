package fris.dev.backend.mapper;

import fris.dev.backend.DTO.ApprovalDecisionDto;
import fris.dev.backend.entities.ApprovalDecision;
import fris.dev.backend.entities.ApprovalInstance;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.ApprovalInstanceRepository;
import fris.dev.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
@RequiredArgsConstructor
public class ApprovalDecisionMapper {

    private final ApprovalInstanceRepository instanceRepository;
    private final UserRepository userRepository;

    public ApprovalDecision toEntity(ApprovalDecisionDto dto) {
        ApprovalInstance instance = instanceRepository.findById(dto.getApprovalInstanceId())
                .orElseThrow(() -> new IllegalArgumentException("ApprovalInstance not found"));
        User approver = userRepository.findById(dto.getApproverUserId())
                .orElseThrow(() -> new IllegalArgumentException("Approver not found"));

        return new ApprovalDecision(null, instance, dto.getLevelOrder(), approver,
                dto.getDecision(), new Timestamp(System.currentTimeMillis()), dto.getRemarks());
    }
}

