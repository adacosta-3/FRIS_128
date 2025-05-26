package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.TeachingActivityDto;
import fris.dev.backend.DTO.TeachingActivityResponseDto;
import fris.dev.backend.entities.*;
import fris.dev.backend.mapper.TeachingActivityMapper;
import fris.dev.backend.repositories.*;
import fris.dev.backend.service.TeachingActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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
    private final CourseAndSetRepository courseAndSetRepository;
    private final AuthorshipRepository authorshipRepository;

//    @Override
//    @Transactional
//    public TeachingActivity submit(TeachingActivityDto dto) {
//
//        // Create submission record for approval workflow
//        Submission submission = new Submission();
//        submission.setUser(activity.getUser());
//        submission.setActivityType("teaching");
//        submission.setReferenceId(teachingId);
//        submission.setSubmittedAt(new Timestamp(System.currentTimeMillis()));
//        submission.setCurrentVersion(1);
//        submission = submissionRepository.save(submission);
//
//        // Find approval path for the user roles and units
//        User user = activity.getUser();
//        List<UserRole> roles = userRoleRepository.findByUser(user);
//
//        boolean pathFound = false;
//
//        for (UserRole role : roles) {
//            Optional<ApprovalPathAssignment> assignment = pathAssignmentRepository
//                    .findByRoleRankAndCollegeAndDepartment(role.getRoleRank(), role.getCollege(), role.getDepartment());
//
//            if (assignment.isPresent()) {
//                ApprovalPath path = assignment.get().getApprovalPath();
//
//                ApprovalInstance instance = new ApprovalInstance();
//                instance.setSubmission(submission);
//                instance.setVersion(1);
//                instance.setApprovalPath(path);
//                instance.setCurrentLevel(1);
//                instance.setStatus("Pending");
//                instance.setLastUpdated(new Timestamp(System.currentTimeMillis()));
//                instance.setManualOverride(false);
//                approvalInstanceRepository.save(instance);
//
//                pathFound = true;
//                break;
//            }
//        }
//
//        if (!pathFound) {
//            throw new IllegalStateException("No approval path found for this user's role/department/college.");
//        }
//
//        return activity;
//    }

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
        // Save TeachingActivity first
        TeachingActivity activity = teachingActivityRepository.save(teachingActivityMapper.toEntity(dto));

        // Depending on type, create corresponding related entity with minimal required fields
        String type = dto.getType();
        Long teachingId = activity.getTeachingId();
        CourseAndSet cs = new CourseAndSet();
        Authorship auth = new Authorship();

        if ("Course".equalsIgnoreCase(type) || "SET".equalsIgnoreCase(type)) {
            cs.setTeachingActivity(activity);  // Set entity, not just ID
            cs.setAcademicYear(dto.getAcademicYear() != null ? dto.getAcademicYear() : "");
            cs.setTerm(""); // default blank; update later with PUT
            cs.setCourseNumber(""); // default blank
            cs.setSection(""); // default blank
            cs.setCourseDescription(dto.getDescription() != null ? dto.getDescription() : "");
            cs.setCourseType(type);
            cs.setTeachingPoints(null); // or 0 if primitive
            cs.setSupportingDocument("");
            // Save courses_and_sets entity
            try {
                courseAndSetRepository.save(cs);
                System.out.println("CourseAndSet saved successfully.");
            } catch (Exception e) {
                System.err.println("Error saving CourseAndSet: " + e.getMessage());
                e.printStackTrace();
            }
        } else if ("Authorship".equalsIgnoreCase(type)) {
            auth.setTeachingActivity(activity);
            auth.setTitle(dto.getDescription() != null ? dto.getDescription() : "");
            auth.setAuthors("");
            auth.setDate(null);  // null date; can update later
            auth.setUpCourse("");
            auth.setRecommendingUnit("");
            auth.setPublisher("");
            auth.setAuthorshipType("");
            auth.setNumberOfAuthors(null);
            auth.setSupportingDocument("");
            // Save authorship entity
            try {
                authorshipRepository.save(auth);
                System.out.println("Authorship saved successfully.");
            } catch (Exception e) {
                System.err.println("Error saving Authorship: " + e.getMessage());
                e.printStackTrace();
            }
        }

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
            // Override userId to logged in user's ID to enforce ownership and prevent spoofing
            dto.setUserId(user.getUserId());

            // Optionally, you can check for required fields here (e.g., type)
            if (dto.getType() == null || dto.getType().isEmpty()) {
                throw new IllegalArgumentException("Type must not be null or empty");
            }

            submitTeachingActivity(dto, loggedInUsername);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<TeachingActivityResponseDto> getApprovedTeachingActivitiesByType(String username, String type) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<TeachingActivity> activities = teachingActivityRepository.findByUserAndIsApprovedTrueAndType(user, type);

        return activities.stream()
                .map(teachingActivityMapper::toResponseDto)
                .collect(Collectors.toList());
    }


}
