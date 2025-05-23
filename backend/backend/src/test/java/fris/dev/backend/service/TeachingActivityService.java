package fris.dev.backend.service;

import fris.dev.backend.DTO.TeachingActivityDto;
import fris.dev.backend.entities.TeachingActivity;

import java.util.List;

public interface TeachingActivityService {
    TeachingActivity submit(TeachingActivityDto dto);
    List<TeachingActivity> getByUserId(Long userId);
    List<TeachingActivity> getApproved();
}
