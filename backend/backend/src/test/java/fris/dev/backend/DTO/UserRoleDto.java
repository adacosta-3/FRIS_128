package fris.dev.backend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRoleDto {
    private Long userId;
    private Long roleRankId;
    private String college;
    private String department;
    private Boolean isPrimary;
}

