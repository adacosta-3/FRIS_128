package fris.dev.backend.service;

import fris.dev.backend.entities.SDG;
import fris.dev.backend.entities.SDGTarget;

import java.util.List;

public interface SDGService {
    SDG createSDG(String name);
    List<SDG> getAllSDGs();
    SDG getSDGById(Long id);
}


