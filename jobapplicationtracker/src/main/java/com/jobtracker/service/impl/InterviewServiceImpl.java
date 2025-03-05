package com.jobtracker.service.impl;

import com.jobtracker.dto.InterviewDTO;
import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.model.Interview;
import com.jobtracker.model.JobApplication;
import com.jobtracker.model.User;
import com.jobtracker.repository.InterviewRepository;
import com.jobtracker.repository.JobApplicationRepository;
import com.jobtracker.repository.UserRepository;
import com.jobtracker.service.InterviewService;
import com.jobtracker.service.UserService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterviewServiceImpl implements InterviewService {
    private final InterviewRepository interviewRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public InterviewServiceImpl(InterviewRepository interviewRepository, JobApplicationRepository jobApplicationRepository, UserRepository userRepository, UserService userService) {
        this.interviewRepository = interviewRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public InterviewDTO createInterview(InterviewDTO interviewDTO) {
       Interview interview = mapToEntity(interviewDTO);

        JobApplication jobApplication = jobApplicationRepository.findById(interviewDTO.getJobApplicationId())
                .orElseThrow(()-> new ResourceNotFoundException("JobApplication","id",interviewDTO.getJobApplicationId()));

        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()->new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));

        if(!jobApplication.getUser().getId().equals(currentUser.getId())){
            throw new ResourceNotFoundException("JobApplication","id",interviewDTO.getJobApplicationId());
        }

        Interview savedInterview = interviewRepository.save(interview);
        return mapToDto(savedInterview);
    }

    @Override
    public InterviewDTO getInterviewById(Long id) {
        Interview interview = interviewRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Interview","id",id));

        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()-> new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));

        if(!interview.getJobApplication().getUser().getId().equals(currentUser.getId())){
            throw new ResourceNotFoundException("Interview","id",id);
        }

        return mapToDto(interview);
    }

    @Override
    public List<InterviewDTO> getinterviewsByJobApplication(Long jobApplicationId) {
        JobApplication jobApplication = jobApplicationRepository.findById(jobApplicationId)
                .orElseThrow(()-> new ResourceNotFoundException("JobApplicaiton","id",jobApplicationId));

        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()-> new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));

        if(!jobApplication.getUser().getId().equals(currentUser.getId())){
            throw new ResourceNotFoundException("JobApplication","id",jobApplicationId);
        }

        List<Interview> interview = interviewRepository.findByJobApplicationId(jobApplicationId);

        return interview.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }




    @Override
    public List<InterviewDTO> getUpcomingInterviews() {
        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()-> new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));

        LocalDateTime now = LocalDateTime.now();
        List<Interview> interviews = interviewRepository.findUpcomingInterviewsByUser(currentUser, now);
        return interviews.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<InterviewDTO> getInterviewInDateRnage(LocalDateTime start, LocalDateTime end) {
        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()-> new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));



        List<Interview> interviews = interviewRepository.findInterviewsByUserIdInDateRange(currentUser.getId(), start,end);
        return interviews.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }


    @Override
    public InterviewDTO updateInterview(Long id, InterviewDTO interviewDTO) {
        Interview interview = interviewRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Interview","id",id));

        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()-> new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));

        if(!interview.getJobApplication().getUser().getId().equals(currentUser.getId())){
            throw new ResourceNotFoundException("Interview","id",id);
        }

        interview.setLocation(interviewDTO.getLocation());
        interview.setPreparationNotes(interviewDTO.getPreparationNotes());
        interview.setInterviewDateTime(interviewDTO.getInterviewDateTime());

        if(interviewDTO.getJobApplicationId()!=null&&!interviewDTO.getJobApplicationId().equals(interview.getJobApplication().getId())){
            JobApplication jobApplication = jobApplicationRepository.findById(interviewDTO.getJobApplicationId())
                    .orElseThrow(() -> new ResourceNotFoundException("JobApplication", "id", interviewDTO.getJobApplicationId()));

            if (!jobApplication.getUser().getId().equals(currentUser.getId())) {
                throw new ResourceNotFoundException("JobApplication", "id", interviewDTO.getJobApplicationId());
            }

            interview.setJobApplication(jobApplication);
        }

        Interview updatedInterview = interviewRepository.save(interview);
        return mapToDto(updatedInterview);

    }

    @Override
    public InterviewDTO markInterviewCompleted(Long id) {
        Interview interview = interviewRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Interview","id",id));

        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()-> new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));

        if(!interview.getJobApplication().getUser().getId().equals(currentUser.getId())){
            throw new ResourceNotFoundException("Interview","id",id);
        }

        interview.setCompleted(true);
        Interview updatedInterview = interviewRepository.save(interview);
        return mapToDto(updatedInterview);
    }

    @Override
    public void deleteInterview(Long id) {
        Interview interview = interviewRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Interview","id",id));

        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(()-> new ResourceNotFoundException("User","username",userService.getCurrentUser().getUsername()));

        if(!interview.getJobApplication().getUser().getId().equals(currentUser.getId())){
            throw new ResourceNotFoundException("Interview","id",id);
        }

        interviewRepository.delete(interview);

    }

    private InterviewDTO mapToDto(Interview interview){
        InterviewDTO interviewDTO = new InterviewDTO();
        interviewDTO.setId(interview.getId());
        interviewDTO.setLocation(interview.getLocation());
        interviewDTO.setPreparationNotes(interview.getPreparationNotes());
        interviewDTO.setInterviewDateTime(interview.getInterviewDateTime());
        interviewDTO.setInterviewType(interview.getInterviewType());

        interviewDTO.setJobApplicationId(interview.getJobApplication().getId());
        interviewDTO.setPositionTitle(interview.getJobApplication().getPositionTitle());

        if(interview.getJobApplication().getCompany()!=null){
            interviewDTO.setCompanyName(interview.getJobApplication().getCompany().getName());

        }

        return interviewDTO;
    }

    private Interview mapToEntity(InterviewDTO interviewDTO){
        Interview interview = new Interview();
        interview.setId(interviewDTO.getId());
        interview.setLocation(interviewDTO.getLocation());
        interview.setPreparationNotes(interviewDTO.getPreparationNotes());
        interview.setInterviewDateTime(interviewDTO.getInterviewDateTime());
        interview.setInterviewType(interviewDTO.getInterviewType());
        return interview;
    }
}
