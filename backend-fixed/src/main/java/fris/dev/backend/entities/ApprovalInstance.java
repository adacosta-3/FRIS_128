package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.Instant;

@Entity
@Table(name = "approval_instances")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalInstance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long approvalInstanceId;

    @ManyToOne
    @JoinColumn(name = "submission_id", nullable = false)
    private Submission submission;

    @Column(nullable = false)
    private Integer version;

    @ManyToOne
    @JoinColumn(name = "path_id", nullable = false)
    private ApprovalPath approvalPath;

    @Column(nullable = false)
    private Integer currentLevel;

    @Column(nullable = false)
    private String status; // 'Pending', 'Approved', 'Rejected'

    private Timestamp lastUpdated = Timestamp.from(Instant.now());

    @Column(nullable = false)
    private Boolean manualOverride = false;
}

