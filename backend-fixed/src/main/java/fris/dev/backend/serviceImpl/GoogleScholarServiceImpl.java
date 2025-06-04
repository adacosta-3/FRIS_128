package fris.dev.backend.serviceImpl;

import com.google.gson.JsonObject;
import com.google.gson.JsonElement;
import fris.dev.backend.DTO.PublicationDto;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.PublicationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import fris.dev.backend.service.GoogleScholarService;
import serpapi.GoogleSearch;
import serpapi.SerpApiSearchException;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class GoogleScholarServiceImpl implements GoogleScholarService {

    private final UserRepository userRepository;
    private final PublicationService publicationService;

    @Override
    @Transactional
    public void updateGoogleScholarProfile(String username, String profileUrl) {
        int updated = userRepository.updateGoogleScholarProfileUrl(username, profileUrl);
        if (updated == 0) {
            throw new IllegalArgumentException("User not found for username: " + username);
        }
        log.info("Google Scholar profile URL updated for user [{}]: {}", username, profileUrl);
    }

    @Override
    public List<PublicationDto> fetchGoogleScholarPublications(String profileUrl) {
        try {
            log.info("Fetching publications for profile URL: {}", profileUrl);
            return fetchPublicationsFromProfileUrl(profileUrl);
        } catch (SerpApiSearchException e) {
            log.error("Error fetching publications from SerpApi: {}", e.getMessage(), e);
            return new ArrayList<>();
        }
    }

    @Override
    @Transactional
    public void importGoogleScholarPublications(String username) {
        log.info("Starting import of Google Scholar publications for user [{}]", username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String profileUrl = user.getGoogleScholarProfileUrl();
        if (profileUrl == null || profileUrl.isEmpty()) {
            throw new IllegalStateException("Google Scholar profile URL not set for user");
        }

        log.debug("Profile URL for user [{}]: {}", username, profileUrl);
        List<PublicationDto> publications = fetchGoogleScholarPublications(profileUrl);
        log.info("Fetched {} publications for user [{}] from SerpApi", publications.size(), username);

        for (PublicationDto pub : publications) {
            pub.setUserId(user.getUserId());
        }

        publicationService.saveAllFromDto(publications, username);
        log.info("Saved {} publications for user [{}]", publications.size(), username);
    }

    @Override
    public List<PublicationDto> fetchPublicationsFromProfileUrl(String profileUrl) throws SerpApiSearchException {
        String userId = extractUserIdFromUrl(profileUrl);
        if (userId == null) {
            throw new IllegalArgumentException("Invalid Google Scholar Profile URL");
        }

        String apiKey = "ae2e1220500e10992ef9490db9fd358d6d6d481d685898f8a99c19260e1c26ee";
        String endpoint = String.format("https://serpapi.com/search.json?engine=google_scholar_author&author_id=%s&api_key=%s", userId, apiKey);

        log.info("Fetching from SerpApi endpoint: {}", endpoint);

        try (java.util.Scanner s = new java.util.Scanner(new java.net.URL(endpoint).openStream(), "UTF-8").useDelimiter("\\A")) {
            String response = s.hasNext() ? s.next() : "";
            log.debug("Raw SerpApi JSON response: {}", response);

            com.google.gson.JsonObject json = com.google.gson.JsonParser.parseString(response).getAsJsonObject();
            List<PublicationDto> dtos = new ArrayList<>();

            JsonElement articlesElement = json.get("articles");
            if (articlesElement != null && articlesElement.isJsonArray()) {
                for (JsonElement jsonElement : articlesElement.getAsJsonArray()) {
                    JsonObject article = jsonElement.getAsJsonObject();
                    PublicationDto dto = new PublicationDto();

                    dto.setTitle(article.has("title") ? article.get("title").getAsString() : null);
                    dto.setAuthors(article.has("authors") ? article.get("authors").getAsString() : null);
                    dto.setJournal(article.has("publication") ? article.get("publication").getAsString() : null);
                    dto.setCitedAs(article.has("cited_by") ? article.get("cited_by").getAsJsonObject().get("value").getAsString() : null);
                    dto.setDoi(article.has("doi") ? article.get("doi").getAsString() : null);

                    // Date parsing
                    if (article.has("year")) {
                        try {
                            String yearStr = article.get("year").getAsString();
                            dto.setDatePublished(new java.sql.Date(new java.text.SimpleDateFormat("yyyy").parse(yearStr).getTime()));
                        } catch (Exception e) {
                            log.warn("Failed to parse year [{}]: {}", article.get("year"), e.getMessage());
                            dto.setDatePublished(null);
                        }
                    }

                    // Fields SerpApi does NOT provide, set to defaults or null
                    dto.setSupportingDocument(""); // Placeholder; user may upload later

                    // Set publicationTypeId to default "Publication" type from your DB (change if different)
                    dto.setPublicationTypeId(1L);

                    dto.setSdgId(null); // Placeholder, to be assigned later
                    dto.setSdgTargetId(null); // Placeholder, to be assigned later

                    dto.setUserId(null); // Set later during import process

                    log.debug("Mapped publication: {}", dto);
                    dtos.add(dto);
                }
            } else {
                log.warn("No 'articles' found in SerpApi response for user ID [{}]", userId);
            }

            log.info("Mapped {} publications for profile URL: {}", dtos.size(), profileUrl);
            return dtos;

        } catch (Exception e) {
            log.error("Error fetching publications from SerpApi: {}", e.getMessage(), e);
            throw new SerpApiSearchException("Error fetching publications from SerpApi");
        }
    }

    @Override
    public String extractUserIdFromUrl(String url) {
        try {
            URI uri = new URI(url);
            String query = uri.getQuery();
            for (String param : query.split("&")) {
                if (param.startsWith("user=")) {
                    String extractedUserId = param.split("=")[1];
                    log.debug("Extracted user ID from URL [{}]: {}", url, extractedUserId);
                    return extractedUserId;
                }
            }
        } catch (Exception e) {
            log.error("Failed to extract userId from URL: {}", url, e);
            return null;
        }
        return null;
    }
}