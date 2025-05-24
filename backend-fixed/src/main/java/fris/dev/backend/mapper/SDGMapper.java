package fris.dev.backend.mapper;

import fris.dev.backend.DTO.SDGDto;
import fris.dev.backend.entities.SDG;
import org.springframework.stereotype.Component;

@Component
public class SDGMapper {

    public SDGDto toDto(SDG entity) {
        return new SDGDto(entity.getSdgId(), entity.getSdgName());
    }

    public SDG toEntity(SDGDto dto) {
        SDG sdg = new SDG();
        sdg.setSdgId(dto.getSdgId());
        sdg.setSdgName(dto.getSdgName());
        return sdg;
    }
}

