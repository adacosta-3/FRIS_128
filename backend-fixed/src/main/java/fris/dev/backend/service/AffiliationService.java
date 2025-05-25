package fris.dev.backend.service;

import fris.dev.backend.DTO.AffiliationDto;

import java.util.List;

public interface AffiliationService {
    AffiliationDto add(AffiliationDto dto, String username);
    List<AffiliationDto> getAll(String username);
    AffiliationDto update(AffiliationDto dto, String username);
    void delete(Long affiliationId, String username);
}

