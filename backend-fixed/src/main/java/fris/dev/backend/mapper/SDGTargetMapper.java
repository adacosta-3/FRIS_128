package fris.dev.backend.mapper;

import fris.dev.backend.DTO.SDGTargetDto;
import fris.dev.backend.entities.SDG;
import fris.dev.backend.entities.SDGTarget;
import fris.dev.backend.repositories.SDGRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SDGTargetMapper {

    private final SDGRepository sdgRepository;

    public SDGTargetDto toDto(SDGTarget entity) {
        return new SDGTargetDto(entity.getSdgTargetId(), entity.getSdg().getSdgId(), entity.getSdgTargetName());
    }

    public SDGTarget toEntity(SDGTargetDto dto) {
        SDGTarget target = new SDGTarget();
        target.setSdgTargetName(dto.getSdgTargetName());

        if (dto.getSdgId() != null) {
            SDG sdg = sdgRepository.findById(dto.getSdgId())
                    .orElseThrow(() -> new IllegalArgumentException("SDG not found"));
            target.setSdg(sdg);
        }
        target.setSdgTargetId(dto.getSdgTargetId());
        return target;
    }
}

