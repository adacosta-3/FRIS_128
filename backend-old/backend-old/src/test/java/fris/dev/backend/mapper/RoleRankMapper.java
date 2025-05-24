package fris.dev.backend.mapper;

import fris.dev.backend.DTO.RoleRankDto;
import fris.dev.backend.entities.RoleRank;
import org.springframework.stereotype.Component;

@Component
public class RoleRankMapper {
    public RoleRank toEntity(RoleRankDto dto) {
        return new RoleRank(null, dto.getRoleRankName(), dto.getIsApprover());
    }
}
