package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.PublicServiceTypeDto;
import fris.dev.backend.entities.PublicServiceType;
import fris.dev.backend.repositories.PublicServiceTypeRepository;
import fris.dev.backend.service.PublicServiceTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.LinkedHashMap;

@Service
@RequiredArgsConstructor
public class PublicServiceTypeServiceImpl implements PublicServiceTypeService {

    private final PublicServiceTypeRepository publicServiceTypeRepository;

    @Override
    public List<PublicServiceTypeDto> getAllPublicServiceTypesGrouped() {
        List<PublicServiceType> allTypes = publicServiceTypeRepository.findAllOrderByTypeNameAndSubtypeName();

        Map<String, List<String>> grouped = allTypes.stream()
                .collect(Collectors.groupingBy(
                        PublicServiceType::getTypeName,
                        LinkedHashMap::new,
                        Collectors.mapping(PublicServiceType::getSubtypeName, Collectors.toList())
                ));

        return grouped.entrySet().stream()
                .map(entry -> new PublicServiceTypeDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }
}

