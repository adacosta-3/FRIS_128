package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.RoleRankDto;
import fris.dev.backend.entities.RoleRank;
import fris.dev.backend.mapper.RoleRankMapper;
import fris.dev.backend.repositories.RoleRankRepository;
import fris.dev.backend.service.RoleRankService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleRankServiceImpl implements RoleRankService {

    private final RoleRankRepository roleRankRepository;
    private final RoleRankMapper roleRankMapper;

    @Override
    public RoleRank createRoleRank(RoleRankDto dto) {
        return roleRankRepository.save(roleRankMapper.toEntity(dto));
    }

    @Override
    public Optional<RoleRank> getByName(String name) {
        return roleRankRepository.findByRoleRankName(name);
    }

    @Override
    public List<RoleRank> getAll() {
        return roleRankRepository.findAll();
    }
}
