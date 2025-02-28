package com.jobtracker.service;

import com.jobtracker.dto.DocumentDTO;
import com.jobtracker.dto.JobApplicationDTO;
import com.jobtracker.model.enums.DocumentType;

import java.util.List;

public interface DocumentService {
    DocumentDTO createDocument(DocumentDTO documentDTO);
    DocumentDTO getDocumentById(Long id);
    List<DocumentDTO> getDocumentsByJobApplication(JobApplicationDTO jobApplicationDTO);
    List<DocumentDTO> getDocumentsByType(Long jobApplicationId, DocumentType documentType);
    List<DocumentDTO> getAllUserDocuments();
    List<DocumentDTO> getAllUserDocumentsByType(DocumentType documentType);
    DocumentDTO updateDocument(Long id, DocumentDTO documentDTO);
    void deleteDocument(Long id);
}
