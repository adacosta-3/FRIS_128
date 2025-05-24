package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "publication_types")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicationType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long publicationTypeId;

    private String typeName;
    private String subtypeName;
}

