package com.jobtracker.controller;

import com.jobtracker.dto.JobApplicationDTO;
import com.jobtracker.model.enums.ApplicationStatus;
import com.jobtracker.service.JobApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/job-applications")
public class JobApplicationController {
    private final JobApplicationService jobApplicationService;

    public JobApplicationController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    @PostMapping
    public ResponseEntity<JobApplicationDTO> createJobApplication(
            @Valid @RequestBody JobApplicationDTO jobApplicationDTO) {
        JobApplicationDTO createdJobApplication = jobApplicationService.createJobApplication(jobApplicationDTO);
        return new ResponseEntity<>(createdJobApplication, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationDTO> getJobApplicationById(@PathVariable Long id) {
        JobApplicationDTO jobApplicationDTO = jobApplicationService.getJobApplicationById(id);
        return ResponseEntity.ok(jobApplicationDTO);
    }

    @GetMapping
    public ResponseEntity<List<JobApplicationDTO>> getAllJobApplications() {
        List<JobApplicationDTO> jobApplications = jobApplicationService.getAllJobApplications();
        return ResponseEntity.ok(jobApplications);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<JobApplicationDTO>> getJobApplicationsByStatus(
            @PathVariable ApplicationStatus status) {
        List<JobApplicationDTO> jobApplications = jobApplicationService.getAllJobApplicationsByStatus(status);
        return ResponseEntity.ok(jobApplications);
    }

    @GetMapping("/search")
    public ResponseEntity<List<JobApplicationDTO>> searchJobApplications(
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) String positionTitle) {
        if (companyName != null) {
            return ResponseEntity.ok(jobApplicationService.searchJobApplicationsByCompany(companyName));
        }
        if (positionTitle != null) {
            return ResponseEntity.ok(jobApplicationService.searchJobApplicationsByPosition(positionTitle));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/recent")
    public ResponseEntity<List<JobApplicationDTO>> getRecentJobApplications(
            @RequestParam(defaultValue = "5") int limit) {
        List<JobApplicationDTO> recentApplications = jobApplicationService.getRecentJobApplications(limit);
        return ResponseEntity.ok(recentApplications);
    }

    @GetMapping("/date")
    public ResponseEntity<List<JobApplicationDTO>> getJobApplicationsAfterDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<JobApplicationDTO> jobApplications = jobApplicationService.getJobApplicationsAfterDate(date);
        return ResponseEntity.ok(jobApplications);
    }

    @GetMapping("/upcoming-interviews")
    public ResponseEntity<List<JobApplicationDTO>> getJobApplicationsWithUpcomingInterviews() {
        List<JobApplicationDTO> jobApplications = jobApplicationService.getJobApplicationsWithUpcomingInterviews();
        return ResponseEntity.ok(jobApplications);
    }

    @GetMapping("/status-counts")
    public ResponseEntity<Map<ApplicationStatus, Long>> getApplicationStatusCounts() {
        Map<ApplicationStatus, Long> statusCounts = jobApplicationService.getApplicationsStatusCounts();
        return ResponseEntity.ok(statusCounts);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobApplicationDTO> updateJobApplication(
            @PathVariable Long id,
            @Valid @RequestBody JobApplicationDTO jobApplicationDTO) {
        JobApplicationDTO updatedJobApplication = jobApplicationService.updateJobApplication(id, jobApplicationDTO);
        return ResponseEntity.ok(updatedJobApplication);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<JobApplicationDTO> updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status) {
        JobApplicationDTO updatedJobApplication = jobApplicationService.updateJobApplicationStatus(id, status);
        return ResponseEntity.ok(updatedJobApplication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobApplication(@PathVariable Long id) {
        jobApplicationService.deleteJobApplication(id);
        return ResponseEntity.noContent().build();
    }
}