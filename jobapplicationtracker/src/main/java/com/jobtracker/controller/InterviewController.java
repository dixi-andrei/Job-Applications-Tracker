package com.jobtracker.controller;

import com.jobtracker.dto.InterviewDTO;
import com.jobtracker.service.InterviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {
    private final InterviewService interviewService;

    @Autowired
    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @PostMapping
    public ResponseEntity<InterviewDTO> createInterview(@Valid @RequestBody InterviewDTO interviewDTO){
        InterviewDTO interviewDTO1 = interviewService.createInterview(interviewDTO);
        return new ResponseEntity<>(interviewDTO1, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterviewDTO> getInterviewById(@PathVariable Long id){
        InterviewDTO interviewDTO = interviewService.getInterviewById(id);
        return ResponseEntity.ok(interviewDTO);
    }

    @GetMapping("/job-application/{jobApplicationId}")
    public ResponseEntity<List<InterviewDTO>> getInterviewsByApplicationId(@PathVariable Long jobApplicationId){
        List<InterviewDTO> interviewDTOs = interviewService.getinterviewsByJobApplication(jobApplicationId);
        return ResponseEntity.ok(interviewDTOs);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<InterviewDTO>> getUpcomingInterviews(){
        List<InterviewDTO> interviewDTOS = interviewService.getUpcomingInterviews();
        return ResponseEntity.ok(interviewDTOS);
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<InterviewDTO>> getInterviewsInDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {

        List<InterviewDTO> interviewDTOS = interviewService.getInterviewInDateRnage(start,end);
        return ResponseEntity.ok(interviewDTOS);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterviewDTO> updateInterview(@PathVariable Long id, @Valid @RequestBody InterviewDTO interviewDTO){
        InterviewDTO interviewDTO1 = interviewService.updateInterview(id,interviewDTO);
        return ResponseEntity.ok(interviewDTO1);
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<InterviewDTO> markInterviewAsCompleted(@PathVariable Long id){
        InterviewDTO interviewDTO1 = interviewService.markInterviewCompleted(id);
        return ResponseEntity.ok(interviewDTO1);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterview(@PathVariable Long id){
        interviewService.deleteInterview(id);
        return ResponseEntity.noContent().build();
    }
}
