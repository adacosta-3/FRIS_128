package fris.dev.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthorshipDto {
    private Long teachingId;
    private String title;
    private String authors;
    private Date date;
    private String upCourse;
    private String recommendingUnit;
    private String publisher;
    private String authorshipType;
    private Integer numberOfAuthors;
    private String supportingDocument;
}

