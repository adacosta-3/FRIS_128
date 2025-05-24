package fris.dev.backend.repositories;

import fris.dev.backend.entities.ApprovalDecision;
import fris.dev.backend.entities.ApprovalInstance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApprovalDecisionRepository extends JpaRepository<ApprovalDecision, Long> {
    List<ApprovalDecision> findByApprovalInstance(ApprovalInstance instance);
}

