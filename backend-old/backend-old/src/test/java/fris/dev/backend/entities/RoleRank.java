package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "role_rank")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleRank {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleRankId;

    @Column(nullable = false, unique = true)
    private String roleRankName;

    @Column(nullable = false)
    private Boolean isApprover = false;
}
