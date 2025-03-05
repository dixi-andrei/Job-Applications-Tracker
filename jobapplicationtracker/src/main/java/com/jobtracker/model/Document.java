package com.jobtracker.model;

import com.jobtracker.model.enums.DocumentType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name ="documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_application_id", nullable = false)
    private JobApplication jobApplication;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DocumentType documentType;

    private String filePath;

    private String url;

    @Column(nullable = false)
    private LocalDateTime uploadedAt = LocalDateTime.now();

    private String version;

    public Long getId() {
        return id;
    }

    public JobApplication getJobApplication() {
        return jobApplication;
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

    public void setJobApplication(JobApplication jobApplication) {
        this.jobApplication = jobApplication;
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
