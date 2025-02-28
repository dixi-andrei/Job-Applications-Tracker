package com.jobtracker.repository;

import com.jobtracker.model.Interview;
import com.jobtracker.model.JobApplication;
import com.jobtracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview,Long> {

    List<Interview> findByJobApplicationId(Long jobApplicationId);
    List<Interview> findByJobApplication(JobApplication jobApplication);

    List<Interview> findByJobApplicationAndInterviewDateTimeAfterOrderByInterviewDateTime(
            JobApplication jobApplication, LocalDateTime now);

    List<Interview> findByJobApplicationAAndCompletedTrue(JobApplication jobApplication);

    List<Interview> findByInterviewUserIdInRage(Long id,LocalDateTime start, LocalDateTime end);

    @Query("SELECT i FROM Interview i WHERE i.jobApplication.user = ?1 AND i.interviewDateTime > ?2 ORDER BY i.interviewDateTime ASC")
    List<Interview> findUpcomingInterviewsByUser(User user, LocalDateTime now);

   }
