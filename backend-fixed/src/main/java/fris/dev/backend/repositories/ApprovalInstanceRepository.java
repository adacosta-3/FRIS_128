package fris.dev.backend.repositories;

import fris.dev.backend.entities.ApprovalInstance;
import fris.dev.backend.entities.RoleRank;
import fris.dev.backend.entities.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApprovalInstanceRepository extends JpaRepository<ApprovalInstance, Long> {

    @Query("""
        SELECT ai FROM ApprovalInstance ai
        JOIN FETCH ai.submission s
        JOIN ai.approvalPath ap
        JOIN ApprovalLevel al ON al.approvalPath = ap
        WHERE ai.status = 'Pending'
          AND ai.currentLevel = al.levelOrder
          AND al.roleRank = :roleRank
    """)
    List<ApprovalInstance> findPendingApprovalsByRoleRank(@Param("roleRank") RoleRank roleRank);
    List<ApprovalInstance> findBySubmission(Submission submission);
    List<ApprovalInstance> findByStatus(String status);
    List<ApprovalInstance> findBySubmissionOrderByVersionDesc(Submission submission);


    Optional<Object> findTopBySubmissionOrderByVersionDesc(Submission submission);
}

