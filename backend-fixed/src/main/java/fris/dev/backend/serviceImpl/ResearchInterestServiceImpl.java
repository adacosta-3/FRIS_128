package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.ResearchInterestDto;
import fris.dev.backend.entities.ResearchInterest;
import fris.dev.backend.entities.User;
import fris.dev.backend.mapper.ResearchInterestMapper;
import fris.dev.backend.repositories.ResearchInterestRepository;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.ResearchInterestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResearchInterestServiceImpl implements ResearchInterestService {

    private final ResearchInterestRepository repository;
    private final ResearchInterestMapper mapper;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public ResearchInterestDto add(ResearchInterestDto dto, String username) {
        ResearchInterest entity = mapper.toEntity(dto, username);
        entity = repository.save(entity);
        return mapper.toDto(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResearchInterestDto> getAll(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<ResearchInterest> list = repository.findByUser(user);
        return list.stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ResearchInterestDto update(ResearchInterestDto dto, String username) {
        if (dto.getResearchInterestId() == null) {
            throw new IllegalArgumentException("ResearchInterestId is required for update");
        }
        ResearchInterest entity = repository.findById(dto.getResearchInterestId())
                .orElseThrow(() -> new IllegalArgumentException("Research Interest not found"));
        if (!entity.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("You don't own this record");
        }
        entity.setResearchInterest(dto.getResearchInterest());
        entity = repository.save(entity);
        return mapper.toDto(entity);
    }

    @Override
    @Transactional
    public void delete(Long id, String username) {
        ResearchInterest entity = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Research Interest not found"));
        if (!entity.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("You don't own this record");
        }
        repository.delete(entity);
    }
}

