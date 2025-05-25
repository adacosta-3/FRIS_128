package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.PublicationTypeDto;
import fris.dev.backend.entities.PublicationType;
import fris.dev.backend.mapper.PublicationTypeMapper;
import fris.dev.backend.repositories.PublicationTypeRepository;
import fris.dev.backend.service.PublicationTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.LinkedHashMap;

@Service
@RequiredArgsConstructor
public class PublicationTypeServiceImpl implements PublicationTypeService {

    private final PublicationTypeRepository repository;
    private final PublicationTypeMapper mapper;

    @Override
    public PublicationType create(PublicationTypeDto dto) {
        if (dto.getSubtypes() == null || dto.getSubtypes().isEmpty()) {
            throw new IllegalArgumentException("Subtype list cannot be empty");
        }
        // Create entities for each subtype (or just the first one)
        PublicationType entity = mapper.toEntity(dto.getTypeName(), dto.getSubtypes().get(0));
        return repository.save(entity);
    }


    @Override
    public List<PublicationType> getAll() {
        return repository.findAll();
    }

    @Override
    public List<PublicationTypeDto> getAllPublicationTypesGrouped() {
        List<PublicationType> allTypes = repository.findAllOrderByTypeNameAndSubtypeName();

        Map<String, List<String>> grouped = allTypes.stream()
                .collect(Collectors.groupingBy(
                        PublicationType::getTypeName,
                        LinkedHashMap::new,
                        Collectors.mapping(PublicationType::getSubtypeName, Collectors.toList())
                ));

        return grouped.entrySet().stream()
                .map(entry -> new PublicationTypeDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

}
