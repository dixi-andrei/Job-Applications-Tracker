package com.jobtracker.service;

import com.jobtracker.dto.InterviewDTO;
import com.jobtracker.model.Interview;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface InterviewService {
    InterviewDTO createInterview(InterviewDTO interviewDTO);
    InterviewDTO getInterviewById(Long id);
    List<InterviewDTO> getinterviewsByJobApplication(Long jobApplicationId);
    List<InterviewDTO> getUpcomingInterviews();
    List<InterviewDTO> getInterviewInDateRnage(LocalDateTime start, LocalDateTime end);
    InterviewDTO updateInterview(Long id, InterviewDTO interviewDTO);
    InterviewDTO markInterviewCompleted(Long id);
    void deleteInterview(Long id);

}
