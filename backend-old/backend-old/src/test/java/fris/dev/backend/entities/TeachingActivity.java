package fris.dev.backend.entities;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "teaching_activities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeachingActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teachingId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String type; // 'Course', 'SET', 'Authorship'

    private String description;
    private String academicYear;

    private Boolean isApproved = false;
}


