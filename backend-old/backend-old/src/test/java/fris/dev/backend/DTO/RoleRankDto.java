package fris.dev.backend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleRankDto {
    private String roleRankName;
    private Boolean isApprover;
}

