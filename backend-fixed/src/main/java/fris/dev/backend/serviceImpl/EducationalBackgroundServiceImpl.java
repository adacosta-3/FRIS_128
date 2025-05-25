package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.EducationalBackgroundDto;
import fris.dev.backend.entities.EducationalBackground;
import fris.dev.backend.entities.User;
import fris.dev.backend.mapper.EducationalBackgroundMapper;
import fris.dev.backend.repositories.EducationalBackgroundRepository;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.EducationalBackgroundService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EducationalBackgroundServiceImpl implements EducationalBackgroundService {

    private final EducationalBackgroundRepository repository;
    private final EducationalBackgroundMapper mapper;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public EducationalBackgroundDto add(EducationalBackgroundDto dto, String username) {
        EducationalBackground entity = mapper.toEntity(dto, username);
        entity = repository.save(entity);
        return mapper.toDto(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EducationalBackgroundDto> getAll(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<EducationalBackground> list = repository.findByUser(user);
        return list.stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EducationalBackgroundDto update(EducationalBackgroundDto dto, String username) {
        if (dto.getEduId() == null) {
            throw new IllegalArgumentException("eduId is required for update");
        }
        EducationalBackground entity = repository.findById(dto.getEduId())
                .orElseThrow(() -> new IllegalArgumentException("Educational background not found"));

        // Check ownership
        if (!entity.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("You don't own this record");
        }

        entity.setDegree(dto.getDegree());
        entity.setSchool(dto.getSchool());
        entity.setGraduationYear(dto.getGraduationYear());
        entity.setDegreeType(dto.getDegreeType());

        entity = repository.save(entity);
        return mapper.toDto(entity);
    }

    @Override
    @Transactional
    public void delete(Long eduId, String username) {
        EducationalBackground entity = repository.findById(eduId)
                .orElseThrow(() -> new IllegalArgumentException("Educational background not found"));
        if (!entity.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("You don't own this record");
        }
        repository.delete(entity);
    }
}

