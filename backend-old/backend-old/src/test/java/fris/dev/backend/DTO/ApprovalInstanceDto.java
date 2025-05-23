package fris.dev.backend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalInstanceDto {
    private Long submissionId;
    private Integer version;
    private Long pathId;
}

