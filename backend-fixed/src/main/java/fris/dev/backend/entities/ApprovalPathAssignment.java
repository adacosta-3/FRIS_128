package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "approval_path_assignment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalPathAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignmentId;

    @ManyToOne
    @JoinColumn(name = "role_rank_id", nullable = false)
    private RoleRank roleRank;

    private String college;
    private String department;

    @ManyToOne
    @JoinColumn(name = "path_id", nullable = false)
    private ApprovalPath approvalPath;
}
