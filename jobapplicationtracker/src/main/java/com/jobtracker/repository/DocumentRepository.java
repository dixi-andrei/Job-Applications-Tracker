package com.jobtracker.repository;

import com.jobtracker.model.Document;
import com.jobtracker.model.JobApplication;
import com.jobtracker.model.User;
import com.jobtracker.model.enums.DocumentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.print.Doc;
import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document,Long> {
    List<Document> findByJobApplication(JobApplication jobApplication);

    List<Document> findByJobApplicationId(Long jobApplicationId);
    List<Document> findByJobApplicationAndDocumentType(JobApplication jobApplication, DocumentType documentType);

    @Query("Select d from Document d WHERE d.jobApplication.user = ?1")
    List<Document> findAllDocumentsByUser(User user);

    @Query("SELECT d FROM Document d WHERE d.jobApplication.user = ?1 AND d.documentType = ?2")
    List<Document> findAllDocumentsByUserAndType(User user, DocumentType documentType);
}
