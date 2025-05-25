package fris.dev.backend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PendingApprovalDto {
    private Long approvalInstanceId;
    private Long submissionId;
    private String activityType;     // publication, teaching, service
    private Long referenceId;        // ID of the underlying activity
    private int currentLevel;
    private String status;

    private String submitterName;    // Who submitted this

    // Activity specific details:
    private String title;            // Publication title or teaching description or service description
    private String extraInfo;        // Journal name, Academic Year, etc. (optional)
}


