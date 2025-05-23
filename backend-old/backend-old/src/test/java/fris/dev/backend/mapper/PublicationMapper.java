package fris.dev.backend.mapper;

import fris.dev.backend.DTO.PublicationDto;
import fris.dev.backend.entities.Publication;
import fris.dev.backend.entities.PublicationType;
import fris.dev.backend.entities.SDG;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.PublicationTypeRepository;
import fris.dev.backend.repositories.SDGRepository;
import fris.dev.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PublicationMapper {

    private final UserRepository userRepository;
    private final PublicationTypeRepository publicationTypeRepository;
    private final SDGRepository sdgRepository;

    public Publication toEntity(PublicationDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        PublicationType type = publicationTypeRepository.findById(dto.getPublicationTypeId())
                .orElse(null);
        SDG sdg = dto.getSdgId() != null ? sdgRepository.findById(dto.getSdgId()).orElse(null) : null;

        return new Publication(null, user, dto.getTitle(), dto.getAuthors(), dto.getDatePublished(),
                dto.getJournal(), dto.getCitedAs(), dto.getDoi(), dto.getSupportingDocument(), false, type, sdg);
    }
}

