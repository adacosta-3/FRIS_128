package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "sdg")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SDG {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sdgId;

    @Column(nullable = false)
    private String sdgName;

    @OneToMany(mappedBy = "sdg", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SDGTarget> targets;
}
