package fris.dev.backend.service;

import fris.dev.backend.DTO.PublicationDto;
import jakarta.transaction.Transactional;
import serpapi.*;

import java.util.List;

public interface GoogleScholarService {
    @Transactional
    void updateGoogleScholarProfile(String username, String profileUrl);

    List<PublicationDto> fetchGoogleScholarPublications(String profileUrl);

    void importGoogleScholarPublications(String username);

    // Extract user id from URL and fetch publications
//    List<PublicationDto> fetchPublicationsFromProfileUrl(String profileUrl);

    List<PublicationDto> fetchPublicationsFromProfileUrl(String profileUrl) throws SerpApiSearchException;

    String extractUserIdFromUrl(String url);
}
