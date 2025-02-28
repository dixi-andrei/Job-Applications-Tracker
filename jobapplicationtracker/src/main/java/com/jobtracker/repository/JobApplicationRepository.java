package com.jobtracker.repository;

import com.jobtracker.model.JobApplication;
import com.jobtracker.model.User;
import com.jobtracker.model.enums.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication,Long> {
    List<JobApplication> findByUser(User user);

    List<JobApplication> findByUserAndStatus(User user, ApplicationStatus status);

    List<JobApplication> findByUserId(Long id);
    List<JobApplication> findByUserAndCompanyNameContainingIgnoreCase(User user, String companyName);

    List<JobApplication> findByUserAndPositionTitleContainingIgnoreCase(User user, String positionTitle);

    List<JobApplication> findByUserAndApplicationDateAfter(User user, LocalDate date);

    long countByUserAndStatus(User user, ApplicationStatus status);

    long countByUser(User user);

    List<JobApplication> findByUserOrderByApplicationDateDesc(User user);

    @Query("SELECT DISTINCT ja FROM JobApplication ja JOIN ja.interviews i WHERE ja.user = ?1 AND i.interviewDateTime > CURRENT_TIMESTAMP ORDER BY i.interviewDateTime ASC")
    List<JobApplication> findWithUpcomingInterviews(User user);
}
