package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.AffiliationDto;
import fris.dev.backend.entities.Affiliation;
import fris.dev.backend.entities.User;
import fris.dev.backend.mapper.AffiliationMapper;
import fris.dev.backend.repositories.AffiliationRepository;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.AffiliationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AffiliationServiceImpl implements AffiliationService {

    private final AffiliationRepository repository;
    private final AffiliationMapper mapper;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public AffiliationDto add(AffiliationDto dto, String username) {
        Affiliation entity = mapper.toEntity(dto, username);
        entity = repository.save(entity);
        return mapper.toDto(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AffiliationDto> getAll(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Affiliation> list = repository.findByUser(user);
        return list.stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AffiliationDto update(AffiliationDto dto, String username) {
        if (dto.getAffiliationId() == null) {
            throw new IllegalArgumentException("affiliationId is required for update");
        }

        Affiliation entity = repository.findById(dto.getAffiliationId())
                .orElseThrow(() -> new IllegalArgumentException("Affiliation not found"));

        if (!entity.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("You don't own this record");
        }

        entity.setAffiliationName(dto.getAffiliationName());
        entity.setAffiliationType(dto.getAffiliationType());
        entity = repository.save(entity);
        return mapper.toDto(entity);
    }

    @Override
    @Transactional
    public void delete(Long affiliationId, String username) {
        Affiliation entity = repository.findById(affiliationId)
                .orElseThrow(() -> new IllegalArgumentException("Affiliation not found"));

        if (!entity.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("You don't own this record");
        }

        repository.delete(entity);
    }
}

