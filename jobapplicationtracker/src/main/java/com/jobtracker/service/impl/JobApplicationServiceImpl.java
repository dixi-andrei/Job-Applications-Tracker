package com.jobtracker.service.impl;

import com.jobtracker.dto.JobApplicationDTO;
import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.model.Company;
import com.jobtracker.model.JobApplication;
import com.jobtracker.model.User;
import com.jobtracker.model.enums.ApplicationStatus;
import com.jobtracker.repository.CompanyRepository;
import com.jobtracker.repository.JobApplicationRepository;
import com.jobtracker.repository.UserRepository;
import com.jobtracker.service.JobApplicationService;
import com.jobtracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public JobApplicationServiceImpl(JobApplicationRepository jobApplicationRepository, CompanyRepository companyRepository, UserRepository userRepository, UserService userService) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public JobApplicationDTO createJobApplication(JobApplicationDTO jobApplicationDTO) {
        JobApplication jobApplication = mapToEntity(jobApplicationDTO);

        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()-> new ResourceNotFoundException("User","username", userService.getCurrentUser().getUsername()));
        jobApplication.setUser(currentUser);

        if(jobApplicationDTO.getCompanyId()!=null){
            Company company = companyRepository.findById(jobApplicationDTO.getCompanyId())
                    .orElseThrow(()-> new ResourceNotFoundException("Company","id",jobApplicationDTO.getCompanyId()));
            jobApplication.setCompany(company);
        }

        if(jobApplication.getStatus()==null){
            jobApplication.setStatus(ApplicationStatus.APPLIED);
        }

        if(jobApplication.getApplicationDate()==null){
            jobApplication.setApplicationDate(LocalDate.now());
        }

        JobApplication savedJobApplication = jobApplicationRepository.save(jobApplication);
        return mapToDto(savedJobApplication);
    }

    @Override
    public JobApplicationDTO getJobApplicationById(Long id) {
        JobApplication jobApplication = jobApplicationRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Job application","id",id));
        return mapToDto(jobApplication);
    }

    @Override
    public List<JobApplicationDTO> getAllJobApplications() {
        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));
        List<JobApplication> jobApplication = jobApplicationRepository.findByUserId(currentUser.getId());
        return jobApplication.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobApplicationDTO> getAllJobApplicationsByStatus(ApplicationStatus status) {
        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()->new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));
        List<JobApplication> jobApplications = jobApplicationRepository.findByUserAndStatus(currentUser,status);
        return jobApplications.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());

    }

    @Override
    public List<JobApplicationDTO> searchJobApplicationsByCompany(String companyName) {
        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()->new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));
        List<JobApplication> jobApplications = jobApplicationRepository.findByUserAndCompanyNameContainingIgnoreCase(currentUser,companyName);
        return jobApplications.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobApplicationDTO> searchJobApplicationsByPosition(String positionTitle) {
        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()->new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));
        List<JobApplication> jobApplications = jobApplicationRepository.findByUserAndPositionTitleContainingIgnoreCase(currentUser,positionTitle);
        return jobApplications.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobApplicationDTO> getRecentJobApplications(int limit) {
        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()->new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));
        List<JobApplication> jobApplications = jobApplicationRepository.findByUserOrderByApplicationDateDesc(currentUser);

        return jobApplications.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());

    }

    @Override
    public List<JobApplicationDTO> getJobApplicationsAfterDate(LocalDate date) {
        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()->new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));
        List<JobApplication> jobApplications = jobApplicationRepository.findByUserAndApplicationDateAfter(currentUser,date);
        return jobApplications.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobApplicationDTO> getJobApplicationsWithUpcomingInterviews() {
        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()->new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));
        List<JobApplication> jobApplications = jobApplicationRepository.findWithUpcomingInterviews(currentUser);
        return jobApplications.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Map<ApplicationStatus, Long> getApplicationsStatusCounts() {
        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()->new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));
        Map<ApplicationStatus,Long> statusCounts = new HashMap<>();
        for(ApplicationStatus status :ApplicationStatus.values()){
            Long count = jobApplicationRepository.countByUserAndStatus(currentUser,status);
            statusCounts.put(status,count);
        }
        return statusCounts;
    }

    @Override
    public JobApplicationDTO updateJobApplication(Long id, JobApplicationDTO jobApplicationDTO) {
        JobApplication jobApplication = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job application","id",id));

        jobApplication.setPositionTitle(jobApplicationDTO.getPositionTitle());
        jobApplication.setJobDescription(jobApplicationDTO.getJobDescription());
        jobApplication.setApplicationDate(jobApplicationDTO.getApplicationDate());
        jobApplication.setApplicationUrl(jobApplicationDTO.getApplicationUrl());
        jobApplication.setStatus(jobApplicationDTO.getStatus());
        jobApplication.setLocationType(jobApplicationDTO.getLocationType());
        jobApplication.setNotes(jobApplicationDTO.getNotes());

        if(jobApplicationDTO.getCompanyId()!=null){
            Company company = companyRepository.findById(jobApplicationDTO.getCompanyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Company","id",id));
            jobApplication.setCompany(company);
        }
        JobApplication updatedApplication = jobApplicationRepository.save(jobApplication);
        return mapToDto(updatedApplication);
    }

    @Override
    public JobApplicationDTO updateJobApplicationStatus(Long id, ApplicationStatus status) {
        JobApplication jobApplication = jobApplicationRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Job application","id",id));

        jobApplication.setStatus(status);
        JobApplication jobApplication1 = jobApplicationRepository.save(jobApplication);
        return mapToDto(jobApplication1);
    }

    @Override
    public void deleteJobApplication(Long id) {
        JobApplication jobApplication = jobApplicationRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Job application","id",id));
        jobApplicationRepository.delete(jobApplication);
    }

    private JobApplicationDTO mapToDto(JobApplication jobApplication){
        JobApplicationDTO dto = new JobApplicationDTO();
        dto.setId(jobApplication.getId());
        dto.setJobDescription(jobApplication.getJobDescription());
        dto.setApplicationUrl(jobApplication.getApplicationUrl());
        dto.setStatus(jobApplication.getStatus());
        dto.setLocationType(jobApplication.getLocationType());
        dto.setNotes(jobApplication.getNotes());
        dto.setApplicationDate(jobApplication.getApplicationDate());
        dto.setPositionTitle(jobApplication.getPositionTitle());

        if(jobApplication.getCompany()!=null){
            dto.setCompanyId(jobApplication.getCompany().getId());
            dto.setCompanyName(jobApplication.getCompany().getName());
        }

        return dto;
    }

    private JobApplication mapToEntity(JobApplicationDTO jobApplicationDTO){
        JobApplication jobApplication = new JobApplication();
        jobApplication.setId(jobApplicationDTO.getId());
        jobApplication.setPositionTitle(jobApplicationDTO.getPositionTitle());
        jobApplication.setLocationType(jobApplicationDTO.getLocationType());
        jobApplication.setNotes(jobApplicationDTO.getNotes());
        jobApplication.setApplicationUrl(jobApplicationDTO.getApplicationUrl());
        jobApplication.setJobDescription(jobApplicationDTO.getJobDescription());
        jobApplication.setStatus(jobApplicationDTO.getStatus());
        jobApplication.setApplicationDate(jobApplicationDTO.getApplicationDate());

        return jobApplication;

    }
}
