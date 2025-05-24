package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "authorship")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Authorship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long authorshipId;

    @ManyToOne
    @JoinColumn(name = "teaching_id", nullable = false)
    private TeachingActivity teachingActivity;

    private String title;
    private String authors;
    private Date date;
    private String upCourse;
    private String recommendingUnit;
    private String publisher;
    private String authorshipType;
    private Integer numberOfAuthors;
    private String supportingDocument;
}
