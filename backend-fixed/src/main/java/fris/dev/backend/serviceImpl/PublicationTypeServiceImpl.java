package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.PublicationTypeDto;
import fris.dev.backend.entities.PublicationType;
import fris.dev.backend.mapper.PublicationTypeMapper;
import fris.dev.backend.repositories.PublicationTypeRepository;
import fris.dev.backend.service.PublicationTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicationTypeServiceImpl implements PublicationTypeService {

    private final PublicationTypeRepository repository;
    private final PublicationTypeMapper mapper;

    @Override
    public PublicationType create(PublicationTypeDto dto) {
        return repository.save(mapper.toEntity(dto));
    }

    @Override
    public List<PublicationType> getAll() {
        return repository.findAll();
    }
}
