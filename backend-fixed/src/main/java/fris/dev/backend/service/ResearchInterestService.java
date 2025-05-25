package fris.dev.backend.service;

import fris.dev.backend.DTO.ResearchInterestDto;

import java.util.List;

public interface ResearchInterestService {
    ResearchInterestDto add(ResearchInterestDto dto, String username);
    List<ResearchInterestDto> getAll(String username);
    ResearchInterestDto update(ResearchInterestDto dto, String username);
    void delete(Long id, String username);
}
