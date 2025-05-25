package fris.dev.backend.DTO;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicServiceDto {

    @CsvBindByName(column = "UserId")
    private Long userId;

    @CsvBindByName(column = "ServiceTypeId")
    private Long serviceTypeId;

    @CsvBindByName(column = "Description")
    private String description;

    @CsvDate("MM-dd-yyyy")
    @CsvBindByName(column = "DateOfService")
    private Date dateOfService;
}
