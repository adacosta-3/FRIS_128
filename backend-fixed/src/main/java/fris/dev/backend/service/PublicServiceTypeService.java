package fris.dev.backend.service;

import fris.dev.backend.DTO.PublicServiceTypeDto;

import java.util.List;

public interface PublicServiceTypeService {
    List<PublicServiceTypeDto> getAllPublicServiceTypesGrouped();
}

