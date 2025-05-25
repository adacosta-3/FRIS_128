package fris.dev.backend.service;

import fris.dev.backend.DTO.PublicationDto;
import fris.dev.backend.DTO.PublicationResponseDto;
import fris.dev.backend.DTO.TeachingActivityDto;
import fris.dev.backend.entities.Publication;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PublicationService {
    Publication submitPublication(PublicationDto dto);

    List<Publication> getUserPublications(Long userId);

    List<Publication> getApprovedPublications();

    List<PublicationResponseDto> getApprovedPublicationsByUser(Long userId);

    List<PublicationResponseDto> getApprovedPublicationsByUserAndType(Long userId, Long publicationTypeId);

    // Add bulk save from DTO for CSV import
    void saveAllFromDto(List<PublicationDto> dtos, String loggedInUsername);
}
