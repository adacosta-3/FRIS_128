package fris.dev.backend.entities;

import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "approval_levels")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long approvalLevelId;

    @ManyToOne
    @JoinColumn(name = "path_id", nullable = false)
    private ApprovalPath approvalPath;

    private int levelOrder;

    @ManyToOne
    @JoinColumn(name = "role_rank_id", nullable = false)
    private RoleRank roleRank;

    @Column(nullable = false)
    private String scope; // 'department', 'college', 'university'

    private Integer deadlineDays;
}

