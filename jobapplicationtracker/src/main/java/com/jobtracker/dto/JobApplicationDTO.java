package com.jobtracker.dto;

import com.jobtracker.model.enums.ApplicationStatus;
import com.jobtracker.model.enums.Location;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobApplicationDTO {
    private Long id;

    @NotNull(message = "Company ID is required")
    private Long companyId;

    private String companyName;

    @NotBlank(message = "Position title is required")
    private String positionTitle;

    @NotBlank(message = "Aplication date is required")
    @PastOrPresent(message = "Application date cannot be in the future")
    private LocalDate applicationDate;

    @NotBlank(message = "Application status is required")
    private ApplicationStatus status;

    private String jobDescription;

    private Location locationType;

    private String applicationUrl;

    private String notes;
}
