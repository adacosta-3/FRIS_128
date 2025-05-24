package fris.dev.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SDGTargetDto {
    private Long sdgTargetId;
    private Long sdgId; // Parent SDG id
    private String sdgTargetName;
}
