package fris.dev.backend.DTO;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String email;
    private String password;
}