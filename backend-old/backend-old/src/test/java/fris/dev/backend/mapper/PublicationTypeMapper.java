package fris.dev.backend.mapper;

import fris.dev.backend.DTO.PublicationTypeDto;
import fris.dev.backend.entities.PublicationType;
import org.springframework.stereotype.Component;

@Component
public class PublicationTypeMapper {
    public PublicationType toEntity(PublicationTypeDto dto) {
        return new PublicationType(null, dto.getTypeName(), dto.getSubtypeName());
    }
}

