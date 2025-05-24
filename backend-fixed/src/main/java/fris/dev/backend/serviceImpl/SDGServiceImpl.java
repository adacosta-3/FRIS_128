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

    private final SDGRepository sdgRepository;

    @Override
    public SDG createSDG(String name) {
        SDG sdg = new SDG();
        sdg.setSdgName(name);
        return sdgRepository.save(sdg);
    }

    @Override
    public List<SDG> getAllSDGs() {
        return sdgRepository.findAll();
    }

    @Override
    public SDG getSDGById(Long id) {
        return sdgRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("SDG not found"));
    }
}

