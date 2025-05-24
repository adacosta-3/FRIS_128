package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.PublicationDto;
import fris.dev.backend.entities.*;
import fris.dev.backend.mapper.PublicationMapper;
import fris.dev.backend.repositories.*;
import fris.dev.backend.service.PublicationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

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
        // 1️⃣ Save the publication first
        Publication publication = publicationRepository.save(publicationMapper.toEntity(dto));

        // 2️⃣ Create a Submission record
        Submission submission = new Submission();
        submission.setUser(publication.getUser());
        submission.setActivityType("publication");
        submission.setReferenceId(publication.getPublicationId());
        submission.setSubmittedAt(new Timestamp(System.currentTimeMillis()));
        submission.setCurrentVersion(1);
        submission = submissionRepository.save(submission);

        // 3️⃣ Determine the Approval Path based on user's role, department, college
        User user = publication.getUser();
        List<UserRole> roles = userRoleRepository.findByUser(user);

        boolean pathFound = false;

        for (UserRole role : roles) {
            RoleRank rank = role.getRoleRank();
            Optional<ApprovalPathAssignment> assignment = pathAssignmentRepository
                    .findByRoleRankAndCollegeAndDepartment(rank, role.getCollege(), role.getDepartment());

            if (assignment.isPresent()) {
                ApprovalPath path = assignment.get().getApprovalPath();

                // 4️⃣ Create the ApprovalInstance
                ApprovalInstance instance = new ApprovalInstance();
                instance.setSubmission(submission);
                instance.setVersion(1);
                instance.setApprovalPath(path);
                instance.setCurrentLevel(1);
                instance.setStatus("Pending");
                instance.setLastUpdated(new Timestamp(System.currentTimeMillis()));
                instance.setManualOverride(false);
                approvalInstanceRepository.save(instance);

                pathFound = true;
                break; // Exit once a match is found
            }
        }

        if (!pathFound) {
            throw new IllegalStateException("No approval path found for this user's role/department/college.");
        }

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
}
