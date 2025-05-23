package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "courses_and_sets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseAndSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseSetId;

    @ManyToOne
    @JoinColumn(name = "teaching_id", nullable = false)
    private TeachingActivity teachingActivity;

    private String academicYear;
    private String term;
    private String courseNumber;
    private String section;
    private String courseDescription;
    private String courseType;
    private Double teachingPoints;
    private String supportingDocument;
}