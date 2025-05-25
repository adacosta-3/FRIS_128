package fris.dev.backend.repositories;

import fris.dev.backend.entities.Submission;
import fris.dev.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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


}
