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


    public Long getId() {
        return id;
    }

    public Long getJobApplicationId() {
        return jobApplicationId;
    }

    public String getName() {
        return name;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public String getFilePath() {
        return filePath;
    }

    public String getUrl() {
        return url;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public String getVersion() {
        return version;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setJobApplicationId(Long jobApplicationId) {
        this.jobApplicationId = jobApplicationId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
