package fris.dev.backend.DTO;

import com.opencsv.bean.CsvBindByName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeachingActivityDto {

    @CsvBindByName(column = "UserId")
    private Long userId;

    @CsvBindByName(column = "Type")
    private String type;

    @CsvBindByName(column = "Description")
    private String description;

    @CsvBindByName(column = "AcademicYear")
    private String academicYear;
}
