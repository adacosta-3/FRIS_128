package fris.dev.backend.repositories;

import fris.dev.backend.entities.ApprovalInstance;
import fris.dev.backend.entities.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApprovalInstanceRepository extends JpaRepository<ApprovalInstance, Long> {
    List<ApprovalInstance> findBySubmission(Submission submission);
    List<ApprovalInstance> findByStatus(String status);
}
