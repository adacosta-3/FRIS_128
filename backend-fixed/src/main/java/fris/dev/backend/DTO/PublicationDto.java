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
public class PublicationDto {

    @CsvBindByName(column = "UserId")
    private Long userId;

    @CsvBindByName(column = "Title")
    private String title;

    @CsvBindByName(column = "Authors")
    private String authors;

    @CsvDate("MM-dd-yyyy")
    @CsvBindByName(column = "DatePublished")
    private Date datePublished;

    @CsvBindByName(column = "Journal")
    private String journal;

    @CsvBindByName(column = "CitedAs")
    private String citedAs;

    @CsvBindByName(column = "DOI")
    private String doi;

    @CsvBindByName(column = "SupportingDocument")
    private String supportingDocument;

    @CsvBindByName(column = "PublicationTypeId")
    private Long publicationTypeId;

    @CsvBindByName(column = "SDGId")
    private Long sdgId;

    @CsvBindByName(column = "SDGTargetId")
    private Long sdgTargetId;
}
