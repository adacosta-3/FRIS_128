package fris.dev.backend.serviceImpl;

import com.google.gson.JsonObject;
import fris.dev.backend.DTO.PublicationDto;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.PublicationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import fris.dev.backend.service.GoogleScholarService;
import serpapi.*;


import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GoogleScholarServiceImpl implements GoogleScholarService{

    private final UserRepository userRepository;
    private final PublicationService publicationService; // to save publications after fetch

    @Override
    @Transactional
    public void updateGoogleScholarProfile(String username, String profileUrl) {
        int updated = userRepository.updateGoogleScholarProfileUrl(username, profileUrl);
        if (updated == 0) {
            throw new IllegalArgumentException("User not found for username: " + username);
        }
    }

    @Override
    public List<PublicationDto> fetchGoogleScholarPublications(String profileUrl) {
        // TODO: Implement actual call to SurfAPI or any third-party Google Scholar API here
        // For demonstration, return dummy list
        List<PublicationDto> dummyPubs = new ArrayList<>();
        // dummyPubs.add(...) populate with dummy or fetched data
        return dummyPubs;
    }

    @Override
    public void importGoogleScholarPublications(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String profileUrl = user.getGoogleScholarProfileUrl();
        if (profileUrl == null || profileUrl.isEmpty()) {
            throw new IllegalStateException("Google Scholar profile URL not set for user");
        }

        List<PublicationDto> publications = fetchGoogleScholarPublications(profileUrl);

        // Set userId for all imported publications
        for (PublicationDto pub : publications) {
            pub.setUserId(user.getUserId());
        }

        publicationService.saveAllFromDto(publications, username);
    }

    @Override
    public List<PublicationDto> fetchPublicationsFromProfileUrl(String profileUrl) throws SerpApiSearchException {
        String userId = extractUserIdFromUrl(profileUrl);
        if (userId == null) throw new IllegalArgumentException("Invalid Google Scholar Profile URL");

        Map<String, String> params = Map.of(
                "engine", "google_scholar_author",
                "author_id", userId,
                "api_key", "your-serpapi-key-here"
        );

        GoogleSearch search = new GoogleSearch(params);
        JsonObject results = search.getJson();

        // Get the "articles" array instead of directly casting
        var articles = results.getAsJsonArray("articles");
        List<PublicationDto> dtos = new ArrayList<>();

        if (articles != null) {
            articles.forEach(jsonElement -> {
                JsonObject article = jsonElement.getAsJsonObject();
                PublicationDto dto = new PublicationDto();
                dto.setTitle(article.has("title") ? article.get("title").getAsString() : null);
                dto.setAuthors(article.has("authors") ? article.get("authors").getAsString() : null);
                dto.setJournal(article.has("publication") ? article.get("publication").getAsString() : null);
                dto.setCitedAs(article.has("cited_by") ? article.get("cited_by").getAsJsonObject().get("value").getAsString() : null);
                dto.setDoi(article.has("doi") ? article.get("doi").getAsString() : null);
                if (article.has("year")) {
                    try {
                        String yearStr = article.get("year").getAsString();
                        dto.setDatePublished(new java.sql.Date(new java.text.SimpleDateFormat("yyyy").parse(yearStr).getTime()));
                    } catch (Exception e) {
                        dto.setDatePublished(null);
                    }
                }
                dtos.add(dto);
            });
        }

        return dtos;
    }


    @Override
    public String extractUserIdFromUrl(String url) {
        try {
            URI uri = new URI(url);
            String query = uri.getQuery();
            for(String param : query.split("&")) {
                if(param.startsWith("user=")) {
                    return param.split("=")[1];
                }
            }
        } catch(Exception e) {
            return null;
        }
        return null;
    }
}
