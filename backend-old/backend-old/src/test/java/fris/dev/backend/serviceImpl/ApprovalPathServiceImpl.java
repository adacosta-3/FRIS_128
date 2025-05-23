package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.ApprovalPathDto;
import fris.dev.backend.entities.ApprovalPath;
import fris.dev.backend.mapper.ApprovalPathMapper;
import fris.dev.backend.repositories.ApprovalPathRepository;
import fris.dev.backend.service.ApprovalPathService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApprovalPathServiceImpl implements ApprovalPathService {

    private final ApprovalPathRepository approvalPathRepository;
    private final ApprovalPathMapper approvalPathMapper;

    @Override
    public ApprovalPath create(ApprovalPathDto dto) {
        return approvalPathRepository.save(approvalPathMapper.toEntity(dto));
    }

    @Override
    public List<ApprovalPath> getAll() {
        return approvalPathRepository.findAll();
    }
}

