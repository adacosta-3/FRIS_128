package fris.dev.backend.service;

import fris.dev.backend.DTO.AuthorshipDto;
import fris.dev.backend.entities.Authorship;

import java.util.List;

public interface AuthorshipService {
    Authorship add(AuthorshipDto dto);
    List<Authorship> getByTeachingId(Long teachingId);
}
