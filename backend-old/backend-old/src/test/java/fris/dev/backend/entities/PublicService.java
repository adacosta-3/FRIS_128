package fris.dev.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


@Entity
@Table(name = "public_service")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "service_type_id", nullable = false)
    private PublicServiceType serviceType;

    private String description;
    private Date dateOfService;

    private Boolean isApproved = false;
}
