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

}
