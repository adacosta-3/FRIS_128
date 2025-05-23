package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.ApprovalDecisionDto;
import fris.dev.backend.entities.ApprovalDecision;
import fris.dev.backend.entities.ApprovalInstance;
import fris.dev.backend.entities.ApprovalLevel;
import fris.dev.backend.mapper.ApprovalDecisionMapper;
import fris.dev.backend.repositories.*;
import fris.dev.backend.service.ApprovalDecisionService;
import fris.dev.backend.service.TeachingActivityService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
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
    public ApprovalDecision handleApprovalAction(ApprovalDecisionDto dto) {
        ApprovalDecision decision = decisionMapper.toEntity(dto);
        decision = decisionRepository.save(decision);

        ApprovalInstance instance = decision.getApprovalInstance();
        String decisionValue = dto.getDecision();

        if ("Rejected".equalsIgnoreCase(decisionValue)) {
            instance.setStatus("Rejected");
        } else if ("Approved".equalsIgnoreCase(decisionValue)) {
            // Check if it's the last level in the path
            List<ApprovalLevel> levels = approvalLevelRepository
                    .findByApprovalPathOrderByLevelOrderAsc(instance.getApprovalPath());

            if (instance.getCurrentLevel() >= levels.size()) {
                instance.setStatus("Approved");

                // Set is_approved = true on the underlying activity
                String type = instance.getSubmission().getActivityType();
                Long refId = instance.getSubmission().getReferenceId();
                if (type.equals("publication")) {
                    publicationRepository.findById(refId).ifPresent(p -> {
                        p.setIsApproved(true);
                        publicationRepository.save(p);
                    });
                } else if (type.equals("teaching")) {
                    teachingRepository.findById(refId).ifPresent(t -> {
                        t.setIsApproved(true);
                        teachingRepository.save(t);
                    });
                } else if (type.equals("service")) {
                    publicServiceRepository.findById(refId).ifPresent(s -> {
                        s.setIsApproved(true);
                        publicServiceRepository.save(s);
                    });
                }

            } else {
                // Go to next level
                instance.setCurrentLevel(instance.getCurrentLevel() + 1);
            }
        }

        instance.setLastUpdated(new Timestamp(System.currentTimeMillis()));
        instanceRepository.save(instance);

        return decision;
    }

}

