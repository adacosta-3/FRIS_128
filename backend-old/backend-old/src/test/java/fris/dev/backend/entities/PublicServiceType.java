package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "public_service_types")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicServiceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceTypeId;

    private String typeName;
    private String subtypeName;
}
