package fris.dev.backend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionDto {
    private Long userId;
    private String activityType;
    private Long referenceId;
}
