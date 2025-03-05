package com.jobtracker.model;

import com.jobtracker.model.enums.ApplicationStatus;
import com.jobtracker.model.enums.Location;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import java.util.*;
@Entity
@Table(name = "job_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String positionTitle;

    @Column(nullable = false)
    private LocalDate applicationDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status = ApplicationStatus.APPLIED;

    @Column(columnDefinition = "TEXT")
    private String jobDescription;

    @Enumerated(EnumType.STRING)
    private Location locationType;

    private String applicationUrl;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @OneToMany(mappedBy = "jobApplication", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Interview> interviews = new ArrayList<>();

    @OneToMany(mappedBy = "jobApplication", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Document> documents = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public Company getCompany() {
        return company;
    }

    public User getUser() {
        return user;
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

    public List<Interview> getInterviews() {
        return interviews;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public void setUser(User user) {
        this.user = user;
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

    public void setInterviews(List<Interview> interviews) {
        this.interviews = interviews;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }
}
