package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.PublicServiceDto;
import fris.dev.backend.entities.PublicService;
import fris.dev.backend.entities.User;
import fris.dev.backend.mapper.PublicServiceMapper;
import fris.dev.backend.repositories.PublicServiceRepository;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.PublicServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicServiceServiceImpl implements PublicServiceService {

    private final PublicServiceRepository repository;
    private final PublicServiceMapper mapper;
    private final UserRepository userRepository;

    @Override
    public PublicService create(PublicServiceDto dto) {
        return repository.save(mapper.toEntity(dto));
    }

    @Override
    public List<PublicService> getByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return repository.findByUser(user);
    }

    @Override
    public List<PublicService> getApproved() {
        return repository.findByIsApprovedTrue();
    }
}