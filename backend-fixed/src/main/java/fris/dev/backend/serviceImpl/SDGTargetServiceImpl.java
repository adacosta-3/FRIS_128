package fris.dev.backend.serviceImpl;

import fris.dev.backend.entities.SDG;
import fris.dev.backend.entities.SDGTarget;
import fris.dev.backend.repositories.SDGRepository;
import fris.dev.backend.repositories.SDGTargetRepository;
import fris.dev.backend.service.SDGService;
import fris.dev.backend.service.SDGTargetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SDGTargetServiceImpl implements SDGTargetService {

    private final SDGTargetRepository sdgTargetRepository;
    private final SDGRepository sdgRepository;

    @Override
    public SDGTarget createSDGTarget(Long sdgId, String targetName) {
        SDG sdg = sdgRepository.findById(sdgId)
                .orElseThrow(() -> new IllegalArgumentException("SDG not found"));

        SDGTarget target = new SDGTarget();
        target.setSdg(sdg);
        target.setSdgTargetName(targetName);

        return sdgTargetRepository.save(target);
    }

    @Override
    public List<SDGTarget> getTargetsBySDG(Long sdgId) {
        SDG sdg = sdgRepository.findById(sdgId)
                .orElseThrow(() -> new IllegalArgumentException("SDG not found"));
        return sdgTargetRepository.findBySdg(sdg);
    }
}


