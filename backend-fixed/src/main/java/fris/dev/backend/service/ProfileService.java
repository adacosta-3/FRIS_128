package fris.dev.backend.service;

import fris.dev.backend.DTO.ProfileDto;

public interface ProfileService {
    ProfileDto getLoggedInUserProfile(String username);
}

