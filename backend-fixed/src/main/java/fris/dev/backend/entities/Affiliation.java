package fris.dev.backend.entities;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "affiliations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Affiliation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long affiliationId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String affiliationName;
    private String affiliationType;
}
