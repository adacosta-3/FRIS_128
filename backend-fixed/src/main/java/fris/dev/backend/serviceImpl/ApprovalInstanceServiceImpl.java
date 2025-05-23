package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.ApprovalInstanceDto;
import fris.dev.backend.entities.ApprovalInstance;
import fris.dev.backend.entities.Submission;
import fris.dev.backend.mapper.ApprovalInstanceMapper;
import fris.dev.backend.repositories.ApprovalInstanceRepository;
import fris.dev.backend.repositories.SubmissionRepository;
import fris.dev.backend.service.ApprovalInstanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApprovalInstanceServiceImpl implements ApprovalInstanceService {

    private final ApprovalInstanceRepository instanceRepository;
    private final ApprovalInstanceMapper instanceMapper;
    private final SubmissionRepository submissionRepository;

    @Override
    public ApprovalInstance createInstance(ApprovalInstanceDto dto) {
        return instanceRepository.save(instanceMapper.toEntity(dto));
    }

    @Override
    public List<ApprovalInstance> getBySubmissionId(Long submissionId) {
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new IllegalArgumentException("Submission not found"));
        return instanceRepository.findBySubmission(submission);
    }
}
