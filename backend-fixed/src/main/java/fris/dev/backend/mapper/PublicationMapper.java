package fris.dev.backend.mapper;

import fris.dev.backend.DTO.PublicationDto;
import fris.dev.backend.DTO.PublicationResponseDto;
import fris.dev.backend.entities.*;
import fris.dev.backend.repositories.PublicationTypeRepository;
import fris.dev.backend.repositories.SDGRepository;
import fris.dev.backend.repositories.SDGTargetRepository;
import fris.dev.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PublicationMapper {

    private final UserRepository userRepository;
    private final PublicationTypeRepository publicationTypeRepository;
    private final SDGRepository sdgRepository;
    private final SDGTargetRepository sdgTargetRepository;

    public Publication toEntity(PublicationDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        PublicationType pubType = null;
        if (dto.getPublicationTypeId() != null) {
            pubType = publicationTypeRepository.findById(dto.getPublicationTypeId())
                    .orElse(null);
        }

        SDG sdg = null;
        if (dto.getSdgId() != null) {
            sdg = sdgRepository.findById(dto.getSdgId())
                    .orElse(null);
        }

        SDGTarget sdgTarget = null;
        if (dto.getSdgTargetId() != null) {
            sdgTarget = sdgTargetRepository.findById(dto.getSdgTargetId())
                    .orElse(null);
        }

        Publication publication = new Publication();
        publication.setUser(user);
        publication.setTitle(dto.getTitle());
        publication.setAuthors(dto.getAuthors());
        publication.setDatePublished(dto.getDatePublished());
        publication.setJournal(dto.getJournal());
        publication.setCitedAs(dto.getCitedAs());
        publication.setDoi(dto.getDoi());
        publication.setSupportingDocument(dto.getSupportingDocument());
        publication.setPublicationType(pubType);
        publication.setSdg(sdg);
        publication.setSdgTarget(sdgTarget);
        publication.setIsApproved(false);

        return publication;
    }

    public PublicationResponseDto toResponseDto(Publication publication) {
        String publicationTypeName = null;
        String publicationTypeSubtype = null;
        if (publication.getPublicationType() != null) {
            publicationTypeName = publication.getPublicationType().getTypeName();
            publicationTypeSubtype = publication.getPublicationType().getSubtypeName();
        }

        String sdgName = null;
        if (publication.getSdg() != null) {
            sdgName = publication.getSdg().getSdgName();
        }

        String sdgTargetName = null;
        if (publication.getSdgTarget() != null) {
            sdgTargetName = publication.getSdgTarget().getSdgTargetName();
        }

        return new PublicationResponseDto(
                publication.getPublicationId(),
                publication.getTitle(),
                publication.getAuthors(),
                publication.getDatePublished(),
                publication.getJournal(),
                publication.getCitedAs(),
                publication.getDoi(),
                publication.getSupportingDocument(),
                publicationTypeName,
                publicationTypeSubtype,
                sdgName,
                sdgTargetName
        );
    }

}

