package fris.dev.backend.mapper;

import fris.dev.backend.DTO.ApprovalInstanceDto;
import fris.dev.backend.DTO.PendingApprovalDto;
import fris.dev.backend.entities.ApprovalInstance;
import fris.dev.backend.entities.ApprovalPath;
import fris.dev.backend.entities.Submission;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
@RequiredArgsConstructor
public class ApprovalInstanceMapper {

    private final SubmissionRepository submissionRepository;
    private final ApprovalPathRepository approvalPathRepository;
    private final PublicationRepository publicationRepository;
    private final TeachingActivityRepository teachingActivityRepository;
    private final PublicServiceRepository publicServiceRepository;

    public ApprovalInstance toEntity(ApprovalInstanceDto dto) {
        Submission submission = submissionRepository.findById(dto.getSubmissionId())
                .orElseThrow(() -> new IllegalArgumentException("Submission not found"));
        ApprovalPath path = approvalPathRepository.findById(dto.getPathId())
                .orElseThrow(() -> new IllegalArgumentException("ApprovalPath not found"));

        return new ApprovalInstance(null, submission, dto.getVersion(), path, 1, "Pending",
                new Timestamp(System.currentTimeMillis()), false);
    }

    public PendingApprovalDto toPendingApprovalDto(ApprovalInstance instance) {
        Submission submission = instance.getSubmission();
        User submitter = submission.getUser();

        final String[] title = {null};
        final String[] extraInfo = {null};

        switch (submission.getActivityType()) {
            case "publication":
                publicationRepository.findById(submission.getReferenceId()).ifPresent(pub -> {
                    title[0] = pub.getTitle();
                    extraInfo[0] = pub.getJournal();
                });
                break;
            case "teaching":
                teachingActivityRepository.findById(submission.getReferenceId()).ifPresent(ta -> {
                    title[0] = ta.getDescription();
                    extraInfo[0] = ta.getAcademicYear();
                });
                break;
            case "service":
                publicServiceRepository.findById(submission.getReferenceId()).ifPresent(ps -> {
                    title[0] = ps.getDescription();
                    extraInfo[0] = ps.getDateOfService() != null ? ps.getDateOfService().toString() : null;
                });
                break;
            default:
                title[0] = "Unknown activity";
                break;
        }

        return new PendingApprovalDto(
                instance.getApprovalInstanceId(),
                submission.getSubmissionId(),
                submission.getActivityType(),
                submission.getReferenceId(),
                instance.getCurrentLevel(),
                instance.getStatus(),
                submitter.getFirstName() + " " + submitter.getLastName(),
                title[0],
                extraInfo[0]
        );
    }

}
