package fris.dev.backend.service;

import fris.dev.backend.DTO.DashboardDto;

public interface DashboardService {
    DashboardDto getDashboardCounts(String username, String academicYear, String term);

}
