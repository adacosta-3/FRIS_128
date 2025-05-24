package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.PublicServiceDto;
import fris.dev.backend.entities.*;
import fris.dev.backend.mapper.PublicServiceMapper;
import fris.dev.backend.repositories.*;
import fris.dev.backend.service.PublicServiceService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PublicServiceServiceImpl implements PublicServiceService {

    private final PublicServiceRepository repository;
    private final PublicServiceMapper mapper;
    private final UserRepository userRepository;
    private final SubmissionRepository submissionRepository;
    private final ApprovalPathAssignmentRepository pathAssignmentRepository;
    private final ApprovalInstanceRepository approvalInstanceRepository;
    private final UserRoleRepository userRoleRepository;

    @Override
    @Transactional
    public PublicService create(PublicServiceDto dto) {
        // 1️⃣ Save the public service record
        PublicService service = repository.save(mapper.toEntity(dto));

        // 2️⃣ Create a Submission
        Submission submission = new Submission();
        submission.setUser(service.getUser());
        submission.setActivityType("service");
        submission.setReferenceId(service.getServiceId());
        submission.setSubmittedAt(new Timestamp(System.currentTimeMillis()));
        submission.setCurrentVersion(1);
        submission = submissionRepository.save(submission);

        // 3️⃣ Find the Approval Path
        User user = service.getUser();
        List<UserRole> roles = userRoleRepository.findByUser(user);

        boolean pathFound = false;

        for (UserRole role : roles) {
            Optional<ApprovalPathAssignment> assignment = pathAssignmentRepository
                    .findByRoleRankAndCollegeAndDepartment(role.getRoleRank(), role.getCollege(), role.getDepartment());

            if (assignment.isPresent()) {
                ApprovalPath path = assignment.get().getApprovalPath();

                // 4️⃣ Create ApprovalInstance
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
                break;
            }
        }

        if (!pathFound) {
            throw new IllegalStateException("No approval path found for this user's role/department/college.");
        }

        return service;
    }

    @Override
    public List<PublicService> getByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return repository.findByUser(user);
    }

    @Override
    public List<PublicService> getApproved() {
        return repository.findByIsApprovedTrue();
    }
}
