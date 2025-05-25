package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "educational_background")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EducationalBackground {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eduId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String degree;
    private String school;
    private Integer graduationYear;

    @Column(nullable = false)
    private String degreeType; // "Bachelor", "Master", "Doctoral"
}

