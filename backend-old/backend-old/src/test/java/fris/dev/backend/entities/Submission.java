package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.time.Instant;

@Entity
@Table(name = "submissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long submissionId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String activityType; // 'publication', 'teaching', 'service'

    @Column(nullable = false)
    private Long referenceId;

    private Timestamp submittedAt = Timestamp.from(Instant.now());

    @Column(nullable = false)
    private Integer currentVersion = 1;
}

