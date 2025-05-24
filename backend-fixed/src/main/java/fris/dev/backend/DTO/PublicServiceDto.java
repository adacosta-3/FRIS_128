package fris.dev.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicServiceDto {
    private Long userId;
    private Long serviceTypeId;
    private String description;
    private Date dateOfService;
}