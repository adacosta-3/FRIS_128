package fris.dev.backend.service;

import fris.dev.backend.DTO.RoleRankDto;
import fris.dev.backend.entities.RoleRank;

import java.util.List;
import java.util.Optional;

public interface RoleRankService {
    RoleRank createRoleRank(RoleRankDto dto);
    Optional<RoleRank> getByName(String name);
    List<RoleRank> getAll();
}

