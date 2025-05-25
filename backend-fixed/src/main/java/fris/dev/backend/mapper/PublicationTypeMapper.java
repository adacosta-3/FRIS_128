package fris.dev.backend.mapper;

import fris.dev.backend.DTO.PublicationTypeDto;
import fris.dev.backend.entities.PublicationType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PublicationTypeMapper {

    public PublicationTypeDto toDto(String typeName, List<String> subtypes) {
        return new PublicationTypeDto(typeName, subtypes);
    }

    public PublicationType toEntity(String typeName, String subtypeName) {
        PublicationType entity = new PublicationType();
        entity.setTypeName(typeName);
        entity.setSubtypeName(subtypeName);
        return entity;
    }

    public List<PublicationTypeDto> toGroupedDtoList(List<PublicationType> entities) {
        return entities.stream()
                .collect(Collectors.groupingBy(
                        PublicationType::getTypeName,
                        Collectors.mapping(PublicationType::getSubtypeName, Collectors.toList())
                ))
                .entrySet().stream()
                .map(entry -> new PublicationTypeDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }
}
