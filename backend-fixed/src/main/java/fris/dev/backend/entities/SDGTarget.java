package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sdg_targets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SDGTarget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sdgTargetId;

    private String sdgTargetName;
}
