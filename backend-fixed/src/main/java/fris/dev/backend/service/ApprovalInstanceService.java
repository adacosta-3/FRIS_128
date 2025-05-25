package fris.dev.backend.service;

import fris.dev.backend.DTO.ApprovalInstanceDto;
import fris.dev.backend.entities.ApprovalInstance;
import fris.dev.backend.entities.Submission;

import java.util.List;

public interface ApprovalInstanceService {
    ApprovalInstance createInstance(ApprovalInstanceDto dto);
    List<ApprovalInstance> getBySubmissionId(Long submissionId);
}
