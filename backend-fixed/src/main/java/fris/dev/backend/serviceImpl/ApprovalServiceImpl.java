package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.ApprovalInstanceDto;
import fris.dev.backend.DTO.PendingApprovalDto;
import fris.dev.backend.entities.ApprovalInstance;
import fris.dev.backend.entities.Submission;
import fris.dev.backend.entities.User;
import fris.dev.backend.entities.UserRole;
import fris.dev.backend.mapper.ApprovalInstanceMapper;
import fris.dev.backend.repositories.*;
import fris.dev.backend.service.ApprovalService;
import fris.dev.backend.service.TeachingActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApprovalServiceImpl implements ApprovalService {

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final ApprovalInstanceRepository approvalInstanceRepository;
    private final ApprovalInstanceMapper approvalInstanceMapper;
    private final SubmissionRepository submissionRepository;
    private final PublicationRepository publicationRepository;
    private final TeachingActivityRepository teachingActivityRepository;
    private final PublicServiceRepository publicServiceRepository;

    @Override
    @Transactional(readOnly = true)
    public List<PendingApprovalDto> getPendingApprovalsForUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<UserRole> roles = userRoleRepository.findByUser(user);

        List<ApprovalInstance> allPending = new ArrayList<>();

        for (UserRole role : roles) {
            List<ApprovalInstance> instances = approvalInstanceRepository
                    .findPendingApprovalsByRoleRank(role.getRoleRank());
            allPending.addAll(instances);
        }

        return allPending.stream()
                .map(approvalInstanceMapper::toPendingApprovalDto)
                .collect(Collectors.toList());
    }



    @Transactional(readOnly = true)
    public PendingApprovalDto getPendingApprovalBySubmissionId(Long submissionId) {
        ApprovalInstance approvalInstance = approvalInstanceRepository
                .findBySubmission_SubmissionIdAndStatus(submissionId, "Pending")
                .orElseThrow(() -> new RuntimeException("No pending approval found for submission " + submissionId));

        Submission submission = approvalInstance.getSubmission();
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
                teachingActivityRepository.findById(submission.getReferenceId()).ifPresent(teaching -> {
                    title[0] = teaching.getDescription();
                    extraInfo[0] = teaching.getAcademicYear();
                });
                break;
            case "service":
                publicServiceRepository.findById(submission.getReferenceId()).ifPresent(service -> {
                    title[0] = service.getDescription();
                    extraInfo[0] = service.getDateOfService() != null ? service.getDateOfService().toString() : null;
                });
                break;
            default:
                throw new RuntimeException("Unknown activity type: " + submission.getActivityType());
        }

        return new PendingApprovalDto(
                approvalInstance.getApprovalInstanceId(),
                submission.getSubmissionId(),
                submission.getActivityType(),
                submission.getReferenceId(),
                approvalInstance.getCurrentLevel(),
                approvalInstance.getStatus(),
                submitter.getFirstName() + " " + submitter.getLastName(),
                title[0],
                extraInfo[0]
        );
    }

}



