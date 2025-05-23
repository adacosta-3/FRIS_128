package fris.dev.backend.service;

import fris.dev.backend.entities.SDG;
import fris.dev.backend.entities.SDGTarget;

import java.util.List;

public interface SDGService {
    SDGTarget createTarget(String name);
    SDG createSDG(Long targetId, String sdgName);
    List<SDG> getByTarget(Long targetId);
}

