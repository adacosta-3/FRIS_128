package fris.dev.backend.serviceImpl;

import fris.dev.backend.entities.SDG;
import fris.dev.backend.entities.SDGTarget;
import fris.dev.backend.repositories.SDGRepository;
import fris.dev.backend.repositories.SDGTargetRepository;
import fris.dev.backend.service.SDGService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SDGServiceImpl implements SDGService {

    private final SDGTargetRepository targetRepo;
    private final SDGRepository sdgRepo;

    @Override
    public SDGTarget createTarget(String name) {
        return targetRepo.save(new SDGTarget(null, name));
    }

    @Override
    public SDG createSDG(Long targetId, String sdgName) {
        SDGTarget target = targetRepo.findById(targetId)
                .orElseThrow(() -> new IllegalArgumentException("Target not found"));
        return sdgRepo.save(new SDG(null, target, sdgName));
    }

    @Override
    public List<SDG> getByTarget(Long targetId) {
        SDGTarget target = targetRepo.findById(targetId)
                .orElseThrow(() -> new IllegalArgumentException("Target not found"));
        return sdgRepo.findBySdgTarget(target);
    }
}
