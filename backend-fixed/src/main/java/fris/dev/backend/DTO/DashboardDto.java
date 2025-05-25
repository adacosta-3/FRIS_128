package fris.dev.backend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDto {
    private int totalPublications;
    private int totalProjects;
    private int coursesThisSemester;
    private int pendingSubmissions;
}
