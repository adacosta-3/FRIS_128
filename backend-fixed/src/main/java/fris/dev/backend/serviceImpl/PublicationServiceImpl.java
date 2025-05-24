package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.PublicationDto;
import fris.dev.backend.DTO.PublicationResponseDto;
import fris.dev.backend.entities.*;
import fris.dev.backend.mapper.PublicationMapper;
import fris.dev.backend.repositories.*;
import fris.dev.backend.service.PublicationService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PublicationServiceImpl implements PublicationService {

    private final PublicationRepository publicationRepository;
    private final PublicationMapper publicationMapper;
    private final UserRepository userRepository;
    private final SubmissionRepository submissionRepository;
    private final ApprovalPathAssignmentRepository pathAssignmentRepository;
    private final ApprovalInstanceRepository approvalInstanceRepository;
    private final UserRoleRepository userRoleRepository;
    private final RoleRankRepository roleRankRepository;
    private final ApprovalLevelRepository approvalLevelRepository;

    @Override
    @Transactional
    public Publication submitPublication(PublicationDto dto) {
        // 1️⃣ Save the publication entity
        Publication publication = publicationRepository.save(publicationMapper.toEntity(dto));

        // 2️⃣ Create a Submission wrapper for the approval workflow
        Submission submission = new Submission();
        submission.setUser(publication.getUser());
        submission.setActivityType("publication");
        submission.setReferenceId(publication.getPublicationId());
        submission.setSubmittedAt(new Timestamp(System.currentTimeMillis()));
        submission.setCurrentVersion(1);
        submission = submissionRepository.save(submission);

        User user = publication.getUser();
        List<UserRole> roles = userRoleRepository.findByUser(user);

        if (roles.isEmpty()) {
            throw new IllegalStateException("User has no assigned roles. Cannot assign approval path.");
        }

        // 3️⃣ Find approval path based on user's role and unit (college, department)
        Optional<ApprovalPathAssignment> foundAssignment = Optional.empty();

        for (UserRole role : roles) {
            foundAssignment = pathAssignmentRepository
                    .findByRoleRankAndCollegeAndDepartment(role.getRoleRank(), role.getCollege(), role.getDepartment());
            if (foundAssignment.isPresent()) {
                break;
            }
        }

        // 4️⃣ Fallback: try global/university-wide path (null college and department)
        if (!foundAssignment.isPresent()) {
            RoleRank defaultRole = roles.get(0).getRoleRank(); // pick first role arbitrarily for fallback
            foundAssignment = pathAssignmentRepository.findByRoleRankAndCollegeAndDepartment(defaultRole, null, null);
        }

        if (!foundAssignment.isPresent()) {
            throw new IllegalStateException("No approval path assignment found for user's role and unit.");
        }

        ApprovalPath approvalPath = foundAssignment.get().getApprovalPath();

        // 5️⃣ Create ApprovalInstance: status starts as Pending, at first level (1)
        ApprovalInstance instance = new ApprovalInstance();
        instance.setSubmission(submission);
        instance.setVersion(1);
        instance.setApprovalPath(approvalPath);
        instance.setCurrentLevel(1);
        instance.setStatus("Pending");
        instance.setLastUpdated(new Timestamp(System.currentTimeMillis()));
        instance.setManualOverride(false);
        approvalInstanceRepository.save(instance);

        // 6️⃣ At this point:
        // - Submitter's pending page shows this submission because it’s in approval_instances with status Pending
        // - First approver will see the submission in their to-approve page by querying approval_instances where
        //   currentLevel matches their role_rank in approval_levels of the approvalPath
        //
        // 7️⃣ When approver approves (handled elsewhere):
        // - approval_decisions recorded
        // - approval_instance currentLevel increments
        // - Once final level approved:
        //    -> instance.status set to "Approved"
        //    -> publication.isApproved = true, so it shows up in user profile

        return publication;
    }



    @Override
    public List<Publication> getUserPublications(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return publicationRepository.findByUser(user);
    }

    @Override
    public List<Publication> getApprovedPublications() {
        return publicationRepository.findByIsApprovedTrue();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PublicationResponseDto> getApprovedPublicationsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Publication> publications = publicationRepository.findByUserAndIsApprovedTrue(user);

        return publications.stream()
                .map(publicationMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PublicationResponseDto> getApprovedPublicationsByUserAndType(Long userId, Long publicationTypeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Publication> publications;

        if (publicationTypeId != null) {
            publications = publicationRepository.findByUserAndIsApprovedTrueAndPublicationType_PublicationTypeId(user, publicationTypeId);
        } else {
            publications = publicationRepository.findByUserAndIsApprovedTrue(user);
        }

        return publications.stream()
                .map(publicationMapper::toResponseDto)
                .collect(Collectors.toList());
    }


}
