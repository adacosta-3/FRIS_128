package fris.dev.backend.service;

import fris.dev.backend.DTO.TeachingActivityDto;
import fris.dev.backend.entities.TeachingActivity;
import fris.dev.backend.entities.User;

import java.util.List;

public interface TeachingActivityService {
//    TeachingActivity submit(TeachingActivityDto dto);
    List<TeachingActivity> getByUserId(Long userId);
    List<TeachingActivity> getApproved();
    TeachingActivity submitTeachingActivity(TeachingActivityDto dto, String username);

    // Updated with username param
    void saveAllFromDto(List<TeachingActivityDto> dtos, String loggedInUsername);
}
