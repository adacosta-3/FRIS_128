package fris.dev.backend.entities;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "research_experience")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResearchExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long researchExperienceId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String location;
    private Date startDate;
    private Date endDate;

    @Column(columnDefinition = "TEXT")
    private String experienceDetails;
}

