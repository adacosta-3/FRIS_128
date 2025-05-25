package fris.dev.backend.entities;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "research_interests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResearchInterest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long researchInterestId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(columnDefinition = "TEXT")
    private String researchInterest;
}

