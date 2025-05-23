package fris.dev.backend.mapper;

import fris.dev.backend.DTO.ApprovalPathDto;
import fris.dev.backend.entities.ApprovalPath;
import org.springframework.stereotype.Component;

@Component
public class ApprovalPathMapper {
    public ApprovalPath toEntity(ApprovalPathDto dto) {
        return new ApprovalPath(null, dto.getPathName());
    }
}
