package fris.dev.backend.service;

import fris.dev.backend.DTO.EducationalBackgroundDto;

import java.util.List;

public interface EducationalBackgroundService {
    EducationalBackgroundDto add(EducationalBackgroundDto dto, String username);
    List<EducationalBackgroundDto> getAll(String username);
    EducationalBackgroundDto update(EducationalBackgroundDto dto, String username);
    void delete(Long eduId, String username);
}

