package fris.dev.backend.mapper;


import fris.dev.backend.DTO.PublicServiceTypeDto;
import fris.dev.backend.entities.PublicServiceType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PublicServiceTypeMapper {

    public PublicServiceTypeDto toDto(String typeName, List<String> subtypes) {
        return new PublicServiceTypeDto(typeName, subtypes);
    }

    public PublicServiceType toEntity(String typeName, String subtypeName) {
        PublicServiceType entity = new PublicServiceType();
        entity.setTypeName(typeName);
        entity.setSubtypeName(subtypeName);
        return entity;
    }

    public List<PublicServiceTypeDto> toGroupedDtoList(List<PublicServiceType> entities) {
        return entities.stream()
                .collect(Collectors.groupingBy(
                        PublicServiceType::getTypeName,
                        Collectors.mapping(PublicServiceType::getSubtypeName, Collectors.toList())
                ))
                .entrySet().stream()
                .map(entry -> new PublicServiceTypeDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }
}
