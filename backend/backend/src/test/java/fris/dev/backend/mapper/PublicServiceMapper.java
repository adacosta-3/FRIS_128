package fris.dev.backend.mapper;

import fris.dev.backend.DTO.PublicServiceDto;
import fris.dev.backend.entities.PublicService;
import fris.dev.backend.entities.PublicServiceType;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.PublicServiceTypeRepository;
import fris.dev.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PublicServiceMapper {

    private final UserRepository userRepository;
    private final PublicServiceTypeRepository typeRepository;

    public PublicService toEntity(PublicServiceDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        PublicServiceType type = typeRepository.findById(dto.getServiceTypeId())
                .orElseThrow(() -> new IllegalArgumentException("Service type not found"));

        return new PublicService(null, user, type, dto.getDescription(), dto.getDateOfService(), false);
    }
}

