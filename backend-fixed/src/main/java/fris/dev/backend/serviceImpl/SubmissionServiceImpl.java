package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.DetailedSubmissionDto;
import fris.dev.backend.DTO.SubmissionDto;
import fris.dev.backend.DTO.SubmitterSubmissionDto;
import fris.dev.backend.entities.*;
import fris.dev.backend.mapper.DetailedSubmissionMapper;
import fris.dev.backend.mapper.SubmissionMapper;
import fris.dev.backend.repositories.*;
import fris.dev.backend.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubmissionServiceImpl implements SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final SubmissionMapper submissionMapper;
    private final UserRepository userRepository;
    private final DetailedSubmissionMapper detailedSubmissionMapper;
    private final ApprovalInstanceRepository approvalInstanceRepository;
    private final ApprovalDecisionRepository approvalDecisionRepository;
    private final ApprovalLevelRepository approvalLevelRepository;
    private final UserRoleRepository userRoleRepository;
    private final PublicationRepository publicationRepository;
    private final PublicServiceRepository publicServiceRepository;
    private final TeachingActivityRepository teachingActivityRepository;

    @Override
    public Submission submit(SubmissionDto dto) {
        return submissionRepository.save(submissionMapper.toEntity(dto));
    }

    @Override
    public List<Submission> getUserSubmissions(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return submissionRepository.findByUser(user);
    }

    @Override
    public List<SubmissionDto> getPendingSubmissionsForUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<Submission> submissions = submissionRepository.findPendingSubmissionsByUser(user);
        return submissions.stream()
                .map(submissionMapper::toDto)  // Create a suitable SubmissionDto including linked info
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<SubmissionDto> getPendingSubmissionsForUserByType(String username, String activityType) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Submission> submissions = submissionRepository.findPendingSubmissionsByUserAndActivityType(user, activityType);

        return submissions.stream()
                .map(submissionMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DetailedSubmissionDto> getSubmissionsByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Submission> submissions = submissionRepository.findByUser(user);

        return submissions.stream()
                .map(detailedSubmissionMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DetailedSubmissionDto> getPendingSubmissionsByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Submission> submissions = submissionRepository.findPendingSubmissionsByUser(user);

        return submissions.stream()
                .map(detailedSubmissionMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DetailedSubmissionDto> getPendingSubmissionsByUserAndType(String username, String activityType) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Submission> submissions = submissionRepository.findPendingSubmissionsByUserAndActivityType(user, activityType);

        return submissions.stream()
                .map(detailedSubmissionMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DetailedSubmissionDto> getSubmissionsByUserStatusAndType(String username, String status, String activityType) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Submission> submissions = submissionRepository.findByUserAndStatusAndActivityType(user, status, activityType);

        return submissions.stream()
                .map(detailedSubmissionMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<SubmitterSubmissionDto> getPendingOrRejectedSubmissionsForUser(String username, String activityType) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Submission> submissions = submissionRepository.findSubmitterPendingOrRejected(user, activityType);

        List<SubmitterSubmissionDto> result = new ArrayList<>();

        for (Submission s : submissions) {
            ApprovalInstance ai = approvalInstanceRepository.findBySubmissionOrderByVersionDesc(s).stream()
                    .findFirst()
                    .orElse(null);

            if (ai == null) continue;

            ApprovalPath approvalPath = ai.getApprovalPath();  // Get ApprovalPath entity

            // Fetch current approval level
            ApprovalLevel al = approvalLevelRepository
                    .findByApprovalPathAndLevelOrder(approvalPath, ai.getCurrentLevel())
                    .orElse(null);

            String approverRole = null;
            String approverName = null;
            int totalLevels = 0;

            if (al != null) {
                approverRole = al.getRoleRank().getRoleRankName();
                List<UserRole> userRoles = userRoleRepository.findByRoleRank(al.getRoleRank());
                if (!userRoles.isEmpty()) {
                    User approverUser = userRoles.get(0).getUser();
                    approverName = approverUser.getFirstName() + " " + approverUser.getLastName();
                }
                totalLevels = approvalLevelRepository.countByApprovalPath(approvalPath);
            }

            // Get activity title or description
            String title = "N/A";
            switch (s.getActivityType()) {
                case "publication":
                    title = publicationRepository.findById(s.getReferenceId())
                            .map(Publication::getTitle).orElse("Unknown Publication");
                    break;
                case "teaching":
                    title = teachingActivityRepository.findById(s.getReferenceId())
                            .map(TeachingActivity::getDescription).orElse("Unknown Teaching Activity");
                    break;
                case "service":
                    title = publicServiceRepository.findById(s.getReferenceId())
                            .map(PublicService::getDescription).orElse("Unknown Public Service");
                    break;
            }

            // Get rejection remarks if rejected
            String rejectionRemarks = null;
            if ("Rejected".equalsIgnoreCase(ai.getStatus())) {
                Optional<ApprovalDecision> lastDecision = approvalDecisionRepository
                        .findTopByApprovalInstanceOrderByDecisionDateDesc(ai);
                rejectionRemarks = lastDecision.map(ApprovalDecision::getRemarks).orElse(null);
            }

            SubmitterSubmissionDto dto = new SubmitterSubmissionDto(
                    s.getSubmissionId(),
                    s.getActivityType(),
                    s.getReferenceId(),
                    s.getSubmittedAt(),
                    ai.getStatus(),
                    approverRole,
                    approverName,
                    ai.getCurrentLevel(),
                    totalLevels,
                    title,
                    rejectionRemarks,
                    ai.getLastUpdated()
            );

            result.add(dto);
        }

        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<SubmitterSubmissionDto> getSubmissionsForUserByStatusesAndType(String username, List<String> statuses, String activityType) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Submission> submissions = submissionRepository.findSubmitterByStatusesAndActivityType(user, statuses, activityType);

        List<SubmitterSubmissionDto> result = new ArrayList<>();

        for (Submission s : submissions) {
            ApprovalInstance ai = approvalInstanceRepository.findBySubmissionOrderByVersionDesc(s).stream()
                    .findFirst()
                    .orElse(null);

            if (ai == null) continue;

            ApprovalPath approvalPath = ai.getApprovalPath();  // Get ApprovalPath entity

            // Fetch current approval level
            ApprovalLevel al = approvalLevelRepository
                    .findByApprovalPathAndLevelOrder(approvalPath, ai.getCurrentLevel())
                    .orElse(null);

            String approverRole = null;
            String approverName = null;
            int totalLevels = 0;

            if (al != null) {
                approverRole = al.getRoleRank().getRoleRankName();
                List<UserRole> userRoles = userRoleRepository.findByRoleRank(al.getRoleRank());
                if (!userRoles.isEmpty()) {
                    User approverUser = userRoles.get(0).getUser();
                    approverName = approverUser.getFirstName() + " " + approverUser.getLastName();
                }
                totalLevels = approvalLevelRepository.countByApprovalPath(approvalPath);
            }

            // Get activity title or description
            String title = "N/A";
            switch (s.getActivityType()) {
                case "publication":
                    title = publicationRepository.findById(s.getReferenceId())
                            .map(Publication::getTitle).orElse("Unknown Publication");
                    break;
                case "teaching":
                    title = teachingActivityRepository.findById(s.getReferenceId())
                            .map(TeachingActivity::getDescription).orElse("Unknown Teaching Activity");
                    break;
                case "service":
                    title = publicServiceRepository.findById(s.getReferenceId())
                            .map(PublicService::getDescription).orElse("Unknown Public Service");
                    break;
            }

            // Get rejection remarks if rejected
            String rejectionRemarks = null;
            if ("Rejected".equalsIgnoreCase(ai.getStatus())) {
                Optional<ApprovalDecision> lastDecision = approvalDecisionRepository
                        .findTopByApprovalInstanceOrderByDecisionDateDesc(ai);
                rejectionRemarks = lastDecision.map(ApprovalDecision::getRemarks).orElse(null);
            }

            SubmitterSubmissionDto dto = new SubmitterSubmissionDto(
                    s.getSubmissionId(),
                    s.getActivityType(),
                    s.getReferenceId(),
                    s.getSubmittedAt(),
                    ai.getStatus(),
                    approverRole,
                    approverName,
                    ai.getCurrentLevel(),
                    totalLevels,
                    title,
                    rejectionRemarks,
                    ai.getLastUpdated()
            );

            result.add(dto);
        }

        return result;
    }

}