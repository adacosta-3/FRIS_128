package fris.dev.backend.util;

import com.opencsv.bean.CsvToBeanBuilder;
import fris.dev.backend.DTO.PublicationDto;
import fris.dev.backend.DTO.PublicServiceDto;
import fris.dev.backend.DTO.TeachingActivityDto;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;

@Component
public class CsvParserUtil {

    public List<PublicationDto> parsePublicationsCsv(InputStream csvStream) {
        return new CsvToBeanBuilder<PublicationDto>(new InputStreamReader(csvStream))
                .withType(PublicationDto.class)
                .withIgnoreLeadingWhiteSpace(true)
                .build()
                .parse();
    }

    public List<PublicServiceDto> parsePublicServiceCsv(InputStream csvStream) {
        return new CsvToBeanBuilder<PublicServiceDto>(new InputStreamReader(csvStream))
                .withType(PublicServiceDto.class)
                .withIgnoreLeadingWhiteSpace(true)
                .build()
                .parse();
    }

    public List<TeachingActivityDto> parseTeachingActivityCsv(InputStream csvStream) {
        return new CsvToBeanBuilder<TeachingActivityDto>(new InputStreamReader(csvStream))
                .withType(TeachingActivityDto.class)
                .withIgnoreLeadingWhiteSpace(true)
                .build()
                .parse();
    }
}
