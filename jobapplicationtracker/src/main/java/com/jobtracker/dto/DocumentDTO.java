package com.jobtracker.dto;

import com.jobtracker.model.enums.DocumentType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocumentDTO {

    private Long id;

    @NotNull(message = "Job application ID is required")
    private Long jobApplicationId;

    @NotNull(message = "Document name is required")
    private String name;

    @NotNull(message = "Document type is required")
    private DocumentType documentType;

    private String filePath;

    private String url;

    private LocalDateTime uploadedAt = LocalDateTime.now();

    private String version;

}
