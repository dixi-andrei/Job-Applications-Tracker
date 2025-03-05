package com.jobtracker.dto;

import com.jobtracker.model.enums.ApplicationStatus;
import com.jobtracker.model.enums.Location;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobApplicationDTO {
    private Long id;

    @NotNull(message = "Company ID is required")
    private Long companyId;

    private String companyName;

    @NotBlank(message = "Position title is required")
    private String positionTitle;

    @NotBlank(message = "Aplication date is required")
    @PastOrPresent(message = "Application date cannot be in the future")
    private LocalDate applicationDate;

    @NotBlank(message = "Application status is required")
    private ApplicationStatus status;

    private String jobDescription;

    private Location locationType;

    private String applicationUrl;

    private String notes;

    public Long getId() {
        return id;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getPositionTitle() {
        return positionTitle;
    }

    public LocalDate getApplicationDate() {
        return applicationDate;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public Location getLocationType() {
        return locationType;
    }

    public String getApplicationUrl() {
        return applicationUrl;
    }

    public String getNotes() {
        return notes;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setPositionTitle(String positionTitle) {
        this.positionTitle = positionTitle;
    }

    public void setApplicationDate(LocalDate applicationDate) {
        this.applicationDate = applicationDate;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public void setLocationType(Location locationType) {
        this.locationType = locationType;
    }

    public void setApplicationUrl(String applicationUrl) {
        this.applicationUrl = applicationUrl;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
