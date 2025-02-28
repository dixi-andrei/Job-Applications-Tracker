package com.jobtracker.model;

import com.jobtracker.model.enums.InterviewType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "interviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_application_id",nullable = false)
    private JobApplication jobApplication;

    @Column(nullable = false)
    private LocalDateTime interviewDateTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InterviewType interviewType;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String preparationNotes;

    private Boolean completed = false;

}
