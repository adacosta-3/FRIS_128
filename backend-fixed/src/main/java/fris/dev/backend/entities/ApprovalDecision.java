package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.Instant;

@Entity
@Table(name = "approval_decisions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalDecision {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long approvalDecisionId;

    @ManyToOne
    @JoinColumn(name = "approval_instance_id", nullable = false)
    private ApprovalInstance approvalInstance;

    @Column(nullable = false)
    private Integer levelOrder;

    @ManyToOne
    @JoinColumn(name = "approver_user_id", nullable = false)
    private User approver;

    @Column(nullable = false)
    private String decision; // Approved, Rejected, Skipped

    private Timestamp decisionDate = Timestamp.from(Instant.now());

    private String remarks;
}
