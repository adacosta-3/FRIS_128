package fris.dev.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionDto {
    private Long submissionId;
    private String activityType;
    private Long referenceId;
    private Timestamp submittedAt;
    private Integer currentVersion;
    private Long userId;
}

