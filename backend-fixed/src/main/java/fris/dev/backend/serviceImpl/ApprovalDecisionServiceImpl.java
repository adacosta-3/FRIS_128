package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.ApprovalDecisionDto;
import fris.dev.backend.entities.ApprovalDecision;
import fris.dev.backend.entities.ApprovalInstance;
import fris.dev.backend.entities.ApprovalLevel;
import fris.dev.backend.entities.Submission;
import fris.dev.backend.mapper.ApprovalDecisionMapper;
import fris.dev.backend.repositories.*;
import fris.dev.backend.service.ApprovalDecisionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApprovalDecisionServiceImpl implements ApprovalDecisionService {

    private final ApprovalDecisionRepository decisionRepository;
    private final ApprovalDecisionMapper decisionMapper;
    private final ApprovalInstanceRepository instanceRepository;
    private final ApprovalLevelRepository approvalLevelRepository;
    private final PublicationRepository publicationRepository;
    private final TeachingActivityRepository teachingRepository;
    private final PublicServiceRepository publicServiceRepository;

    @Override
    public ApprovalDecision logDecision(ApprovalDecisionDto dto) {
        return decisionRepository.save(decisionMapper.toEntity(dto));
    }

    @Override
    public List<ApprovalDecision> getByInstanceId(Long instanceId) {
        ApprovalInstance instance = instanceRepository.findById(instanceId)
                .orElseThrow(() -> new IllegalArgumentException("ApprovalInstance not found"));
        return decisionRepository.findByApprovalInstance(instance);
    }

    @Override
    @Transactional
    public ApprovalDecision handleApprovalAction(ApprovalDecisionDto dto, String loggedInUsername) {
        // 1. Fetch decision entity
        ApprovalDecision decision = decisionMapper.toEntity(dto);

        // 2. Verify logged-in user matches approverUserId for security
        if (!loggedInUsername.equals(decision.getApprover().getUsername())) {
            throw new AccessDeniedException("Logged-in user does not match approver.");
        }

        // 3. Save decision record
        decision = decisionRepository.save(decision);

        // 4. Fetch approval instance and related data
        ApprovalInstance instance = decision.getApprovalInstance();
        String decisionValue = dto.getDecision();

        if ("Rejected".equalsIgnoreCase(decisionValue)) {
            // Mark instance as rejected, end of approval
            instance.setStatus("Rejected");
        } else if ("Approved".equalsIgnoreCase(decisionValue)) {
            // Check max approval level for the path
            List<ApprovalLevel> levels = approvalLevelRepository
                    .findByApprovalPathOrderByLevelOrderAsc(instance.getApprovalPath());

            int maxLevel = levels.size();

            if (instance.getCurrentLevel() >= maxLevel) {
                // Last level approved → mark approved
                instance.setStatus("Approved");

                // Mark the underlying activity as approved
                Submission submission = instance.getSubmission();
                String type = submission.getActivityType();
                Long refId = submission.getReferenceId();

                switch (type) {
                    case "publication":
                        publicationRepository.findById(refId).ifPresent(pub -> {
                            pub.setIsApproved(true);
                            publicationRepository.save(pub);
                        });
                        break;
                    case "teaching":
                        teachingRepository.findById(refId).ifPresent(ta -> {
                            ta.setIsApproved(true);
                            teachingRepository.save(ta);
                        });
                        break;
                    case "service":
                        publicServiceRepository.findById(refId).ifPresent(ps -> {
                            ps.setIsApproved(true);
                            publicServiceRepository.save(ps);
                        });
                        break;
                    default:
                        throw new IllegalStateException("Unknown activity type: " + type);
                }
            } else {
                // Not last level → move to next approver
                instance.setCurrentLevel(instance.getCurrentLevel() + 1);
                instance.setStatus("Pending");
            }
        } else if ("Skipped".equalsIgnoreCase(decisionValue)) {
            // Optional: skip this level, advance level
            int maxLevel = approvalLevelRepository
                    .findByApprovalPathOrderByLevelOrderAsc(instance.getApprovalPath())
                    .size();

            if (instance.getCurrentLevel() >= maxLevel) {
                instance.setStatus("Approved");
                // (same logic as above for final approval)
            } else {
                instance.setCurrentLevel(instance.getCurrentLevel() + 1);
                instance.setStatus("Pending");
            }
        }

        instance.setLastUpdated(new Timestamp(System.currentTimeMillis()));
        instanceRepository.save(instance);

        return decision;
    }


}