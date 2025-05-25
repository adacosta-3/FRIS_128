package fris.dev.backend.service;

import fris.dev.backend.DTO.PublicServiceDto;
import fris.dev.backend.DTO.PublicServiceResponseDto;
import fris.dev.backend.entities.PublicService;

import java.util.List;

public interface PublicServiceService {
    PublicService create(PublicServiceDto dto, String loggedInUsername);

    List<PublicService> getByUser(Long userId);

    List<PublicService> getApproved();

    List<PublicServiceResponseDto> getApprovedPublicServicesByUser(Long userId);

    List<PublicServiceResponseDto> getApprovedPublicServicesByUserSorted(Long userId);

    // Add bulk save method for CSV imports
    void saveAllFromDto(List<PublicServiceDto> dtos, String loggedInUsername);
}
