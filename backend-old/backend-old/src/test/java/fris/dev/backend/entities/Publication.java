package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "publications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long publicationId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String title;
    private String authors;
    private Date datePublished;
    private String journal;
    private String citedAs;
    private String doi;
    private String supportingDocument;

    private Boolean isApproved = false;

    @ManyToOne
    @JoinColumn(name = "publication_type_id")
    private PublicationType publicationType;

    @ManyToOne
    @JoinColumn(name = "sdg_id")
    private SDG sdg;
}

