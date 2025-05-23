package fris.dev.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicationDto {
    private Long userId;
    private String title;
    private String authors;
    private Date datePublished;
    private String journal;
    private String citedAs;
    private String doi;
    private String supportingDocument;
    private Long publicationTypeId;
    private Long sdgId;
}