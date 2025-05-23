package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.PublicationDto;
import fris.dev.backend.entities.Publication;
import fris.dev.backend.entities.User;
import fris.dev.backend.mapper.PublicationMapper;
import fris.dev.backend.repositories.PublicationRepository;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.PublicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicationServiceImpl implements PublicationService {

    private final PublicationRepository publicationRepository;
    private final PublicationMapper publicationMapper;
    private final UserRepository userRepository;

    @Override
    public Publication submitPublication(PublicationDto dto) {
        return publicationRepository.save(publicationMapper.toEntity(dto));
    }

    @Override
    public List<Publication> getUserPublications(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return publicationRepository.findByUser(user);
    }

    @Override
    public List<Publication> getApprovedPublications() {
        return publicationRepository.findByIsApprovedTrue();
    }
}