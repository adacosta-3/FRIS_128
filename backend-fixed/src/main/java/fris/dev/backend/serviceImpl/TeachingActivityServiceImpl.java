package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.TeachingActivityDto;
import fris.dev.backend.entities.*;
import fris.dev.backend.mapper.TeachingActivityMapper;
import fris.dev.backend.repositories.*;
import fris.dev.backend.service.TeachingActivityService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeachingActivityServiceImpl implements TeachingActivityService {

    private final TeachingActivityRepository teachingActivityRepository;
    private final TeachingActivityMapper teachingActivityMapper;
    private final UserRepository userRepository;
    private final SubmissionRepository submissionRepository;
    private final ApprovalPathAssignmentRepository pathAssignmentRepository;
    private final ApprovalInstanceRepository approvalInstanceRepository;
    private final UserRoleRepository userRoleRepository;

    @Override
    @Transactional
    public TeachingActivity submit(TeachingActivityDto dto) {
        TeachingActivity activity = teachingActivityRepository.save(teachingActivityMapper.toEntity(dto));

        Submission submission = new Submission();
        submission.setUser(activity.getUser());
        submission.setActivityType("teaching");
        submission.setReferenceId(activity.getTeachingId());
        submission.setSubmittedAt(new Timestamp(System.currentTimeMillis()));
        submission.setCurrentVersion(1);
        submission = submissionRepository.save(submission);

        User user = activity.getUser();
        List<UserRole> roles = userRoleRepository.findByUser(user);

        boolean pathFound = false;

        for (UserRole role : roles) {
            Optional<ApprovalPathAssignment> assignment = pathAssignmentRepository
                    .findByRoleRankAndCollegeAndDepartment(role.getRoleRank(), role.getCollege(), role.getDepartment());

            if (assignment.isPresent()) {
                ApprovalPath path = assignment.get().getApprovalPath();

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

        return activity;
    }

    @Override
    public List<TeachingActivity> getByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return teachingActivityRepository.findByUser(user);
    }

    @Override
    public List<TeachingActivity> getApproved() {
        return teachingActivityRepository.findByIsApprovedTrue();
    }

    @Override
    @Transactional
    public TeachingActivity submitTeachingActivity(TeachingActivityDto dto, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        TeachingActivity ta = teachingActivityMapper.toEntity(dto);
        ta.setUser(user);
        ta.setIsApproved(false);
        ta = teachingActivityRepository.save(ta);

        Submission submission = new Submission();
        submission.setUser(user);
        submission.setActivityType("teaching");
        submission.setReferenceId(ta.getTeachingId());
        submission.setSubmittedAt(new Timestamp(System.currentTimeMillis()));
        submission.setCurrentVersion(1);
        submission = submissionRepository.save(submission);

        List<UserRole> roles = userRoleRepository.findByUser(user);
        if (roles.isEmpty()) throw new IllegalStateException("User has no roles");

        Optional<ApprovalPathAssignment> assignment = Optional.empty();
        for (UserRole role : roles) {
            assignment = pathAssignmentRepository
                    .findByRoleRankAndCollegeAndDepartment(role.getRoleRank(), role.getCollege(), role.getDepartment());
            if (assignment.isPresent()) break;
        }

        if (!assignment.isPresent()) {
            assignment = pathAssignmentRepository
                    .findByRoleRankAndCollegeAndDepartment(roles.get(0).getRoleRank(), null, null);
        }
        if (!assignment.isPresent()) throw new IllegalStateException("No approval path found");

        ApprovalInstance ai = new ApprovalInstance();
        ai.setSubmission(submission);
        ai.setVersion(1);
        ai.setApprovalPath(assignment.get().getApprovalPath());
        ai.setCurrentLevel(1);
        ai.setStatus("Pending");
        ai.setLastUpdated(new Timestamp(System.currentTimeMillis()));
        ai.setManualOverride(false);
        approvalInstanceRepository.save(ai);

        return ta;
    }

    @Override
    @Transactional
    public void saveAllFromDto(List<TeachingActivityDto> dtos, String loggedInUsername) {
        User user = userRepository.findByUsername(loggedInUsername)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        for (TeachingActivityDto dto : dtos) {
            // Map DTO to entity and set user, approval false
            TeachingActivity ta = teachingActivityMapper.toEntity(dto);
            ta.setUser(user);
            ta.setIsApproved(false);
            ta = teachingActivityRepository.save(ta);

            // Create submission wrapper
            Submission submission = new Submission();
            submission.setUser(user);
            submission.setActivityType("teaching");
            submission.setReferenceId(ta.getTeachingId());
            submission.setSubmittedAt(new Timestamp(System.currentTimeMillis()));
            submission.setCurrentVersion(1);
            submission = submissionRepository.save(submission);

            // Find approval path assignment
            List<UserRole> roles = userRoleRepository.findByUser(user);
            if (roles.isEmpty()) throw new IllegalStateException("User has no roles");

            Optional<ApprovalPathAssignment> assignment = Optional.empty();
            for (UserRole role : roles) {
                assignment = pathAssignmentRepository
                        .findByRoleRankAndCollegeAndDepartment(role.getRoleRank(), role.getCollege(), role.getDepartment());
                if (assignment.isPresent()) break;
            }
            if (!assignment.isPresent()) {
                // fallback to global
                assignment = pathAssignmentRepository
                        .findByRoleRankAndCollegeAndDepartment(roles.get(0).getRoleRank(), null, null);
            }
            if (!assignment.isPresent()) throw new IllegalStateException("No approval path found");

            // Create approval instance
            ApprovalInstance ai = new ApprovalInstance();
            ai.setSubmission(submission);
            ai.setVersion(1);
            ai.setApprovalPath(assignment.get().getApprovalPath());
            ai.setCurrentLevel(1);
            ai.setStatus("Pending");
            ai.setLastUpdated(new Timestamp(System.currentTimeMillis()));
            ai.setManualOverride(false);
            approvalInstanceRepository.save(ai);
        }
    }
}
