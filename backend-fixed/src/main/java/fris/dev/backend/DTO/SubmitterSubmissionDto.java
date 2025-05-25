package fris.dev.backend.DTO;

import lombok.*;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitterSubmissionDto {
    private Long submissionId;
    private String activityType;
    private Long referenceId;
    private Timestamp submittedAt;
    private String status;            // Pending or Rejected
    private String currentApproverRole;
    private String currentApproverName;
    private Integer currentLevel;
    private Integer totalLevels;
    private String activityTitleOrDescription;
    private String rejectionRemarks;  // null if not rejected
    private Timestamp lastUpdated;
}




