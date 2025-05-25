package fris.dev.backend.service;

import fris.dev.backend.DTO.DetailedSubmissionDto;
import fris.dev.backend.DTO.SubmissionDto;
import fris.dev.backend.DTO.SubmitterSubmissionDto;
import fris.dev.backend.entities.Submission;

import java.util.List;

public interface SubmissionService {
    Submission submit(SubmissionDto dto);
    List<Submission> getUserSubmissions(Long userId);
    List<SubmissionDto> getPendingSubmissionsForUser(String username);
    List<SubmissionDto> getPendingSubmissionsForUserByType(String username, String activityType);
    List<DetailedSubmissionDto> getSubmissionsByUser(String username);
    List<DetailedSubmissionDto> getPendingSubmissionsByUser(String username);
    List<DetailedSubmissionDto> getPendingSubmissionsByUserAndType(String username, String activityType);
    List<DetailedSubmissionDto> getSubmissionsByUserStatusAndType(String username, String status, String activityType);
    List<SubmitterSubmissionDto> getPendingOrRejectedSubmissionsForUser(String username, String activityType);
    List<SubmitterSubmissionDto> getSubmissionsForUserByStatusesAndType(String username, List<String> statuses, String activityType);



}

