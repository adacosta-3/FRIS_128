package fris.dev.backend.repositories;

import fris.dev.backend.entities.ApprovalDecision;
import fris.dev.backend.entities.ApprovalInstance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ApprovalDecisionRepository extends JpaRepository<ApprovalDecision, Long> {
    List<ApprovalDecision> findByApprovalInstance(ApprovalInstance instance);

    Optional<ApprovalDecision> findTopByApprovalInstanceAndLevelOrderOrderByDecisionDateDesc(ApprovalInstance ai, Integer currentLevel);

    Collection<Object> findByApprovalInstanceAndLevelOrderOrderByDecisionDateDesc(ApprovalInstance ai, Integer currentLevel);

    Optional<ApprovalDecision> findTopByApprovalInstanceOrderByDecisionDateDesc(ApprovalInstance ai);
}

