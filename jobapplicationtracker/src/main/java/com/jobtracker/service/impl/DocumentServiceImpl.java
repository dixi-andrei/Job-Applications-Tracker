package com.jobtracker.service.impl;

import com.jobtracker.dto.DocumentDTO;
import com.jobtracker.dto.JobApplicationDTO;
import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.model.Document;
import com.jobtracker.model.JobApplication;
import com.jobtracker.model.User;
import com.jobtracker.model.enums.DocumentType;
import com.jobtracker.repository.DocumentRepository;
import com.jobtracker.repository.JobApplicationRepository;
import com.jobtracker.repository.UserRepository;
import com.jobtracker.service.DocumentService;
import com.jobtracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    private final UserService userService;

    @Autowired
    public DocumentServiceImpl(DocumentRepository documentRepository, JobApplicationRepository jobApplicationRepository, UserRepository userRepository, UserService userService) {
        this.documentRepository = documentRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }


    @Override
    public DocumentDTO createDocument(DocumentDTO documentDTO) {
        Document document = mapToEntity(documentDTO);

        JobApplication jobApplication = jobApplicationRepository.findById(documentDTO.getJobApplicationId())
                .orElseThrow(()-> new ResourceNotFoundException("JobApplication","id",documentDTO.getJobApplicationId()));

        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", userService.getCurrentUser().getUsername()));

        if (!jobApplication.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("JobApplication", "id", documentDTO.getJobApplicationId());
        }

        document.setJobApplication(jobApplication);
        document.setUploadedAt(LocalDateTime.now());

        Document savedDocument = documentRepository.save(document);
        return maptoDto(savedDocument);
    }

    @Override
    public DocumentDTO getDocumentById(Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Document","id",id));

        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", userService.getCurrentUser().getUsername()));

        if (!document.getJobApplication().getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("Document", "id", id);
        }

        return maptoDto(document);
    }


    @Override
    public List<DocumentDTO> getDocumentsByJobApplication(JobApplicationDTO jobApplicationDTO) {
        JobApplication jobApplication = jobApplicationRepository.findById(jobApplicationDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("JobApplication", "id", jobApplicationDTO.getId()));

        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", userService.getCurrentUser().getUsername()));

        if (!jobApplication.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("JobApplication", "id", jobApplication.getId());
        }

        List<Document> documents = documentRepository.findByJobApplicationId(jobApplicationDTO.getId());

        return documents.stream()
                .map(this::maptoDto)
                .collect(Collectors.toList());

    }

    @Override
    public List<DocumentDTO> getDocumentsByType(Long jobApplicationId, DocumentType documentType) {
        JobApplication jobApplication = jobApplicationRepository.findById(jobApplicationId)
                .orElseThrow(() -> new ResourceNotFoundException("JobApplication", "id", jobApplicationId));

        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", userService.getCurrentUser().getUsername()));

        if (!jobApplication.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("JobApplication", "id", jobApplicationId);
        }
        List<Document> documents = documentRepository.findByJobApplicationAndDocumentType(jobApplication,documentType);

        return documents.stream()
                .map(this::maptoDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<DocumentDTO> getAllUserDocuments() {
        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", userService.getCurrentUser().getUsername()));

        List<Document> documents = documentRepository.findAllDocumentsByUser(currentUser);

        return documents.stream()
                .map(this::maptoDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<DocumentDTO> getAllUserDocumentsByType(DocumentType documentType) {
        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", userService.getCurrentUser().getUsername()));

        List<Document> documents = documentRepository.findAllDocumentsByUserAndType(currentUser,documentType);

        return documents.stream()
                .map(this::maptoDto)
                .collect(Collectors.toList());
    }

    @Override
    public DocumentDTO updateDocument(Long id, DocumentDTO documentDTO) {
        Document document = documentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Document","id",id));

        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", userService.getCurrentUser().getUsername()));

        if(!document.getJobApplication().getUser().getId().equals(currentUser.getId())){
            throw  new ResourceNotFoundException("Document","id",id);
        }

        document.setName(documentDTO.getName());
        document.setDocumentType(documentDTO.getDocumentType());
        document.setUrl(documentDTO.getUrl());
        document.setFilePath(documentDTO.getFilePath());
        document.setVersion(documentDTO.getVersion());

        if (documentDTO.getJobApplicationId() != null &&
                !documentDTO.getJobApplicationId().equals(document.getJobApplication().getId())) {

            JobApplication jobApplication = jobApplicationRepository.findById(documentDTO.getJobApplicationId())
                    .orElseThrow(() -> new ResourceNotFoundException("JobApplication", "id", documentDTO.getJobApplicationId()));

            if (!jobApplication.getUser().getId().equals(currentUser.getId())) {
                throw new ResourceNotFoundException("JobApplication", "id", documentDTO.getJobApplicationId());
            }

            document.setJobApplication(jobApplication);
        }

        Document updatedDocument = documentRepository.save(document);
        return maptoDto(updatedDocument);

    }

    @Override
    public void deleteDocument(Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Document","id",id));

        User currentUser = userRepository.findByUsername(userService.getCurrentUser().getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", userService.getCurrentUser().getUsername()));

        if (!document.getJobApplication().getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("Document", "id", id);
        }

        documentRepository.delete(document);
    }

    private DocumentDTO maptoDto(Document document){
        DocumentDTO documentDTO = new DocumentDTO();
        documentDTO.setId(document.getId());
        documentDTO.setName(document.getName());
        documentDTO.setDocumentType(document.getDocumentType());
        documentDTO.setUrl(document.getUrl());
        documentDTO.setFilePath(document.getFilePath());
        documentDTO.setUploadedAt(document.getUploadedAt());
        documentDTO.setVersion(document.getVersion());
        documentDTO.setJobApplicationId(document.getJobApplication().getId());

        return documentDTO;
    }

    private Document mapToEntity(DocumentDTO documentDTO){
        Document document = new Document();
        document.setId(documentDTO.getId());
        document.setName(documentDTO.getName());
        document.setDocumentType(documentDTO.getDocumentType());
        document.setUrl(documentDTO.getUrl());
        document.setFilePath(documentDTO.getFilePath());
        document.setVersion(documentDTO.getVersion());

        if (documentDTO.getUploadedAt() != null) {
            document.setUploadedAt(documentDTO.getUploadedAt());
        } else {
            document.setUploadedAt(LocalDateTime.now());
        }

        return document;
    }
}
