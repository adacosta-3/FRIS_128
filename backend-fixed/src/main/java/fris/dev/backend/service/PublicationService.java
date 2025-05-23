package fris.dev.backend.service;

import fris.dev.backend.DTO.PublicationDto;
import fris.dev.backend.entities.Publication;

import java.util.List;

public interface PublicationService {
    Publication submitPublication(PublicationDto dto);
    List<Publication> getUserPublications(Long userId);
    List<Publication> getApprovedPublications();
}

