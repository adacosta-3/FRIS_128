package fris.dev.backend.DTO;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicationResponseDto {
    private Long publicationId;
    private String title;
    private String authors;
    private Date datePublished;
    private String journal;
    private String citedAs;
    private String doi;
    private String supportingDocument;
    private String publicationTypeName;
    private String publicationTypeSubtype;
    private String sdgName;
    private String sdgTargetName;
}
