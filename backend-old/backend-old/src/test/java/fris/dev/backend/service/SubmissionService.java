package fris.dev.backend.service;

import fris.dev.backend.DTO.SubmissionDto;
import fris.dev.backend.entities.Submission;

import java.util.List;

public interface SubmissionService {
    Submission submit(SubmissionDto dto);
    List<Submission> getUserSubmissions(Long userId);
}
