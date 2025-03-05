package com.jobtracker.dto;

import com.jobtracker.model.enums.InterviewType;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterviewDTO {

    private Long id;

    @NotNull(message = "Job application is required")
    private Long jobApplicationId;

    private String companyName;
    private String positionTitle;

    @NotNull(message = "Interview date and time is required")
    @FutureOrPresent(message = "Interview date cannot be in the past")
    private LocalDateTime interviewDateTime;

    @NotNull(message = "Interview type is required")
    private InterviewType interviewType;

    private String location;

    private String preparationNotes;

    private Boolean completed = false;

    public Long getId() {
        return id;
    }

    public Long getJobApplicationId() {
        return jobApplicationId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getPositionTitle() {
        return positionTitle;
    }

    public LocalDateTime getInterviewDateTime() {
        return interviewDateTime;
    }

    public InterviewType getInterviewType() {
        return interviewType;
    }

    public String getLocation() {
        return location;
    }

    public String getPreparationNotes() {
        return preparationNotes;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setJobApplicationId(Long jobApplicationId) {
        this.jobApplicationId = jobApplicationId;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setPositionTitle(String positionTitle) {
        this.positionTitle = positionTitle;
    }

    public void setInterviewDateTime(LocalDateTime interviewDateTime) {
        this.interviewDateTime = interviewDateTime;
    }

    public void setInterviewType(InterviewType interviewType) {
        this.interviewType = interviewType;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setPreparationNotes(String preparationNotes) {
        this.preparationNotes = preparationNotes;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
