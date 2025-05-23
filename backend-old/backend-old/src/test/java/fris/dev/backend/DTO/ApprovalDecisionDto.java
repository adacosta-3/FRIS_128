package fris.dev.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalDecisionDto {
    private Long approvalInstanceId;
    private Integer levelOrder;
    private Long approverUserId;
    private String decision; // 'Approved', 'Rejected', 'Skipped'
    private String remarks;
}
