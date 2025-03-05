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

    public String getName(){
        return name;
    }

    public Long getId() {
        return id;
    }

    public String getNotes(){
        return notes;
    }

    public String getLocation(){
        return location;
    }

    public String getWebsite(){
        return website;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
