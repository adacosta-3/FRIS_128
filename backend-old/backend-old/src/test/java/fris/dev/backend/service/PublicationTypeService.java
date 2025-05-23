package fris.dev.backend.service;

import fris.dev.backend.DTO.PublicationTypeDto;
import fris.dev.backend.entities.PublicationType;

import java.util.List;

public interface PublicationTypeService {
    PublicationType create(PublicationTypeDto dto);
    List<PublicationType> getAll();
}

