package com.jobtracker.model;

import com.jobtracker.model.enums.InterviewType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "interviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_application_id",nullable = false)
    private JobApplication jobApplication;

    @Column(nullable = false)
    private LocalDateTime interviewDateTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InterviewType interviewType;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String preparationNotes;

    private Boolean completed = false;

    public Long getId() {
        return id;
    }

    public JobApplication getJobApplication() {
        return jobApplication;
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

    public void setJobApplication(JobApplication jobApplication) {
        this.jobApplication = jobApplication;
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
