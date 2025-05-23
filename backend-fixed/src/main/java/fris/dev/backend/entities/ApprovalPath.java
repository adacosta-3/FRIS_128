package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "approval_paths")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalPath {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pathId;

    @Column(nullable = false)
    private String pathName;
}
