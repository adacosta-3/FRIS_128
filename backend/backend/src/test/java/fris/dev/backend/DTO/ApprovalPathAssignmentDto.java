package fris.dev.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalPathAssignmentDto {
    private Long roleRankId;
    private String college;
    private String department;
    private Long pathId;
}
