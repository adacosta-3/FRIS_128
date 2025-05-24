package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sdg")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SDG {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sdgId;

    @ManyToOne
    @JoinColumn(name = "sdg_target_id", nullable = false)
    private SDGTarget sdgTarget;

    private String sdgName;
}