package fris.dev.backend.service;

import fris.dev.backend.DTO.PublicServiceDto;
import fris.dev.backend.entities.PublicService;

import java.util.List;

public interface PublicServiceService {
    PublicService create(PublicServiceDto dto);
    List<PublicService> getByUser(Long userId);
    List<PublicService> getApproved();
}