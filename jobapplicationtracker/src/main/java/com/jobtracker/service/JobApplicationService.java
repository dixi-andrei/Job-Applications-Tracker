package com.jobtracker.service;

import com.jobtracker.dto.JobApplicationDTO;
import com.jobtracker.model.enums.ApplicationStatus;
import org.hibernate.engine.spi.Status;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface JobApplicationService {
    JobApplicationDTO createJobApplication(JobApplicationDTO jobApplicationDTO);
    JobApplicationDTO getJobApplicationById(Long id);
    List<JobApplicationDTO> getAllJobApplications();
    List<JobApplicationDTO> getAllJobApplicationsByStatus(ApplicationStatus status);
    List<JobApplicationDTO> searchJobApplicationsByCompany(String companyName);
    List<JobApplicationDTO> searchJobApplicationsByPosition(String positionTitle);
    List<JobApplicationDTO> getRecentJobApplications(int limit);
    List<JobApplicationDTO> getJobApplicationsAfterDate(LocalDate date);
    List<JobApplicationDTO> getJobApplicationsWithUpcomingInterviews();
    Map<ApplicationStatus,Long> getApplicationsStatusCounts();
    JobApplicationDTO updateJobApplication(Long id, JobApplicationDTO jobApplicationDTO);
    JobApplicationDTO updateJobApplicationStatus(Long id, ApplicationStatus status);
    void deleteJobApplication(Long id);

}
