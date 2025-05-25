package fris.dev.backend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResearchInterestDto {
    private Long researchInterestId;  // null for create
    private String researchInterest;
}


