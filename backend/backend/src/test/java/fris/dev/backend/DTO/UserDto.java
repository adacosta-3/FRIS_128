package fris.dev.backend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
}
