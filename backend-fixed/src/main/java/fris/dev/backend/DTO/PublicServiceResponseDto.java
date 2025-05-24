package fris.dev.backend.DTO;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicServiceResponseDto {
    private Long serviceId;
    private String typeName;
    private String subtypeName;
    private String description;
    private Date dateOfService;
}
