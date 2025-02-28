package com.jobtracker.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDTO {
    private Long id;

    @NotBlank(message = "Company name is required")
    private String name;

    private String location;

    private String website;

    private String notes;

}
