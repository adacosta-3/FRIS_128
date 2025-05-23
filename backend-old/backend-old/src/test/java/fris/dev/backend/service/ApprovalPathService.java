package fris.dev.backend.service;

import fris.dev.backend.DTO.ApprovalPathDto;
import fris.dev.backend.entities.ApprovalPath;

import java.util.List;

public interface ApprovalPathService {
    ApprovalPath create(ApprovalPathDto dto);
    List<ApprovalPath> getAll();
}

