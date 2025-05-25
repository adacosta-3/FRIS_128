package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.ResearchExperienceDto;
import fris.dev.backend.entities.ResearchExperience;
import fris.dev.backend.entities.User;
import fris.dev.backend.mapper.ResearchExperienceMapper;
import fris.dev.backend.repositories.ResearchExperienceRepository;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.ResearchExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResearchExperienceServiceImpl implements ResearchExperienceService {

    private final ResearchExperienceRepository repository;
    private final ResearchExperienceMapper mapper;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public ResearchExperienceDto add(ResearchExperienceDto dto, String username) {
        ResearchExperience entity = mapper.toEntity(dto, username);
        entity = repository.save(entity);
        return mapper.toDto(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResearchExperienceDto> getAll(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<ResearchExperience> list = repository.findByUser(user);
        return list.stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ResearchExperienceDto update(ResearchExperienceDto dto, String username) {
        if (dto.getResearchExperienceId() == null) {
            throw new IllegalArgumentException("ResearchExperienceId is required for update");
        }
        ResearchExperience entity = repository.findById(dto.getResearchExperienceId())
                .orElseThrow(() -> new IllegalArgumentException("Research Experience not found"));

        if (!entity.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("You don't own this record");
        }

        entity.setLocation(dto.getLocation());
        entity.setStartDate(dto.getStartDate());
        entity.setEndDate(dto.getEndDate());
        entity.setExperienceDetails(dto.getExperienceDetails());

        entity = repository.save(entity);
        return mapper.toDto(entity);
    }

    @Override
    @Transactional
    public void delete(Long id, String username) {
        ResearchExperience entity = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Research Experience not found"));

        if (!entity.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("You don't own this record");
        }

        repository.delete(entity);
    }
}
