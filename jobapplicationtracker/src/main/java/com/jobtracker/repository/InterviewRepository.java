package com.jobtracker.repository;

import com.jobtracker.model.Interview;
import com.jobtracker.model.JobApplication;
import com.jobtracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {

    List<Interview> findByJobApplicationId(Long jobApplicationId);
    List<Interview> findByJobApplication(JobApplication jobApplication);

    List<Interview> findByJobApplicationAndInterviewDateTimeAfterOrderByInterviewDateTime(
            JobApplication jobApplication, LocalDateTime now);


    List<Interview> findByJobApplicationAndCompletedTrue(JobApplication jobApplication);

    @Query("SELECT i FROM Interview i WHERE i.jobApplication.user.id = :userId AND i.interviewDateTime BETWEEN :start AND :end")
    List<Interview> findInterviewsByUserIdInDateRange(
            @Param("userId") Long userId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );

    @Query("SELECT i FROM Interview i WHERE i.jobApplication.user = :user AND i.interviewDateTime > :now ORDER BY i.interviewDateTime ASC")
    List<Interview> findUpcomingInterviewsByUser(
            @Param("user") User user,
            @Param("now") LocalDateTime now
    );
}