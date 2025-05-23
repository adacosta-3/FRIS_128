package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userRoleId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "role_rank_id", nullable = false)
    private RoleRank roleRank;

    private String college;
    private String department;

    @Column(nullable = false)
    private Boolean isPrimary = false;
}
