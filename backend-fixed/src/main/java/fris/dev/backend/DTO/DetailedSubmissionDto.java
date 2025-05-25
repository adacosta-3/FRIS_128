package fris.dev.backend.DTO;

import lombok.*;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailedSubmissionDto {
    private Long submissionId;
    private String activityType;      // publication, teaching, service
    private Long referenceId;         // ID of the activity
    private Timestamp submittedAt;
    private Integer currentVersion;
    private Long userId;
    private String status;            // Pending, Approved, Rejected (from ApprovalInstance)
    private String activityTitle;     // Title, Description, or similar
}
