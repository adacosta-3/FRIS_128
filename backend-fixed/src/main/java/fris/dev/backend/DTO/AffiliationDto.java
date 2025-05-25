package fris.dev.backend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AffiliationDto {
    private Long affiliationId;  // null when creating
    private String affiliationName;
    private String affiliationType;
}

