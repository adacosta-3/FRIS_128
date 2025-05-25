package fris.dev.backend.service;

import fris.dev.backend.DTO.ResearchExperienceDto;

import java.util.List;

public interface ResearchExperienceService {
    ResearchExperienceDto add(ResearchExperienceDto dto, String username);
    List<ResearchExperienceDto> getAll(String username);
    ResearchExperienceDto update(ResearchExperienceDto dto, String username);
    void delete(Long id, String username);
}
