package fris.dev.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalLevelDto {
    private Long pathId;
    private int levelOrder;
    private Long roleRankId;
    private String scope;
    private Integer deadlineDays;
}