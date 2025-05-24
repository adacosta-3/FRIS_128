package fris.dev.backend.service;

import fris.dev.backend.entities.SDGTarget;

import java.util.List;

public interface SDGTargetService {
    SDGTarget createSDGTarget(Long sdgId, String targetName);
    List<SDGTarget> getTargetsBySDG(Long sdgId);
}
