package fris.dev.backend.mapper;

import fris.dev.backend.DTO.DetailedSubmissionDto;
import fris.dev.backend.entities.ApprovalInstance;
import fris.dev.backend.entities.Submission;
import fris.dev.backend.entities.Publication;
import fris.dev.backend.entities.TeachingActivity;
import fris.dev.backend.entities.PublicService;
import fris.dev.backend.repositories.ApprovalInstanceRepository;
import fris.dev.backend.repositories.PublicServiceRepository;
import fris.dev.backend.repositories.PublicationRepository;
import fris.dev.backend.repositories.TeachingActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DetailedSubmissionMapper {

    private final ApprovalInstanceRepository approvalInstanceRepository;
    private final PublicationRepository publicationRepository;
    private final TeachingActivityRepository teachingActivityRepository;
    private final PublicServiceRepository publicServiceRepository;

    public DetailedSubmissionDto toDto(Submission submission) {
        // Get approval instance for this submission (latest version)
        ApprovalInstance approvalInstance = approvalInstanceRepository
                .findBySubmissionOrderByVersionDesc(submission)
                .stream()
                .findFirst()
                .orElse(null);

        String status = approvalInstance != null ? approvalInstance.getStatus() : "Unknown";

        String activityTitle = "N/A";

        switch (submission.getActivityType()) {
            case "publication":
                activityTitle = publicationRepository.findById(submission.getReferenceId())
                        .map(Publication::getTitle)
                        .orElse("Unknown Publication");
                break;
            case "teaching":
                activityTitle = teachingActivityRepository.findById(submission.getReferenceId())
                        .map(TeachingActivity::getDescription)
                        .orElse("Unknown Teaching Activity");
                break;
            case "service":
                activityTitle = publicServiceRepository.findById(submission.getReferenceId())
                        .map(PublicService::getDescription)
                        .orElse("Unknown Public Service");
                break;
        }

        return new DetailedSubmissionDto(
                submission.getSubmissionId(),
                submission.getActivityType(),
                submission.getReferenceId(),
                submission.getSubmittedAt(),
                submission.getCurrentVersion(),
                submission.getUser().getUserId(),
                status,
                activityTitle
        );
    }
}
