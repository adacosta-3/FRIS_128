package fris.dev.backend.repositories;

import fris.dev.backend.DTO.SubmitterSubmissionDto;
import fris.dev.backend.entities.Submission;
import fris.dev.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUser(User user);

    @Query("""
    SELECT s FROM Submission s
    JOIN ApprovalInstance ai ON ai.submission = s
    WHERE s.user = :user
      AND ai.status = 'Pending'
""")
    List<Submission> findPendingSubmissionsByUser(@Param("user") User user);

    @Query("""
    SELECT s FROM Submission s
    JOIN ApprovalInstance ai ON ai.submission = s
    WHERE s.user = :user
      AND ai.status = 'Pending'
      AND s.activityType = :activityType
""")
    List<Submission> findPendingSubmissionsByUserAndActivityType(
            @Param("user") User user,
            @Param("activityType") String activityType);

    @Query("""
    SELECT s FROM Submission s
    JOIN ApprovalInstance ai ON ai.submission = s
    WHERE s.user = :user
      AND ai.status = :status
      AND s.activityType = :activityType
""")
    List<Submission> findByUserAndStatusAndActivityType(
            @Param("user") User user,
            @Param("status") String status,
            @Param("activityType") String activityType);

    @Query("""
SELECT s FROM Submission s
JOIN ApprovalInstance ai ON ai.submission = s
JOIN ApprovalLevel al ON al.approvalPath = ai.approvalPath AND al.levelOrder = ai.currentLevel
JOIN UserRole ur ON ur.roleRank = al.roleRank
JOIN ur.user approver
WHERE s.user = :user
  AND ai.status IN ('Pending', 'Rejected')
  AND (:activityType IS NULL OR s.activityType = :activityType)
""")
    List<Submission> findSubmitterPendingOrRejected(
            @Param("user") User user,
            @Param("activityType") String activityType);

    @Query("""
    SELECT s FROM Submission s
    JOIN ApprovalInstance ai ON ai.submission = s
    JOIN ApprovalLevel al ON al.approvalPath = ai.approvalPath AND al.levelOrder = ai.currentLevel
    JOIN UserRole ur ON ur.roleRank = al.roleRank
    JOIN ur.user approver
    WHERE s.user = :user
      AND ai.status IN :statuses
      AND (:activityType IS NULL OR s.activityType = :activityType)
""")
    List<Submission> findSubmitterByStatusesAndActivityType(
            @Param("user") User user,
            @Param("statuses") List<String> statuses,
            @Param("activityType") String activityType);


}
