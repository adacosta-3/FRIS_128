package fris.dev.backend.repositories;

import fris.dev.backend.entities.ApprovalLevel;
import fris.dev.backend.entities.ApprovalPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApprovalLevelRepository extends JpaRepository<ApprovalLevel, Long> {
    List<ApprovalLevel> findByApprovalPathOrderByLevelOrderAsc(ApprovalPath path);

    Optional<ApprovalLevel> findByApprovalPathAndLevelOrder(ApprovalPath approvalPath, Integer levelOrder);

    int countByApprovalPath(ApprovalPath approvalPath);
}

