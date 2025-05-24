package fris.dev.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRoleUpdateDto {
    private Long userRoleId;         // Existing user-role assignment id
    private Long newUserId;          // New user id to assign role to
    private String newCollege;       // Optional: update college
    private String newDepartment;    // Optional: update department
    private Boolean isPrimary;       // Optional: update primary flag
}

