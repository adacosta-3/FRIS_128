package fris.dev.backend.mapper;

import fris.dev.backend.DTO.ApprovalInstanceDto;
import fris.dev.backend.entities.ApprovalInstance;
import fris.dev.backend.entities.ApprovalPath;
import fris.dev.backend.entities.Submission;
import fris.dev.backend.repositories.ApprovalPathRepository;
import fris.dev.backend.repositories.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
@RequiredArgsConstructor
public class ApprovalInstanceMapper {

    private final SubmissionRepository submissionRepository;
    private final ApprovalPathRepository approvalPathRepository;

    public ApprovalInstance toEntity(ApprovalInstanceDto dto) {
        Submission submission = submissionRepository.findById(dto.getSubmissionId())
                .orElseThrow(() -> new IllegalArgumentException("Submission not found"));
        ApprovalPath path = approvalPathRepository.findById(dto.getPathId())
                .orElseThrow(() -> new IllegalArgumentException("ApprovalPath not found"));

        return new ApprovalInstance(null, submission, dto.getVersion(), path, 1, "Pending",
                new Timestamp(System.currentTimeMillis()), false);
    }
}
