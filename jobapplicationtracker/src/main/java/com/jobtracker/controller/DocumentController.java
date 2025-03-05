package com.jobtracker.controller;

import com.jobtracker.dto.DocumentDTO;
import com.jobtracker.dto.JobApplicationDTO;
import com.jobtracker.model.enums.DocumentType;
import com.jobtracker.service.DocumentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    private final DocumentService documentService;

    @Autowired
    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping
    public ResponseEntity<DocumentDTO> createDocument(@Valid @PathVariable DocumentDTO documentDTO){
        DocumentDTO document = documentService.createDocument(documentDTO);
        return new ResponseEntity<>(document, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentDTO> getDocumentById(@PathVariable Long id){
        DocumentDTO document = documentService.getDocumentById(id);
        return ResponseEntity.ok(document);
    }

    @GetMapping("/job-application/{jobApplicationId")
    public  ResponseEntity<List<DocumentDTO>> getDocumentsByJobApplication(@Valid @PathVariable JobApplicationDTO jobApplicationDTO){
        List<DocumentDTO> documentDTOS = documentService.getDocumentsByJobApplication(jobApplicationDTO);
        return ResponseEntity.ok(documentDTOS);
    }

    @GetMapping("/job-application/{jobApplicationId}/type{documentType}")
    public ResponseEntity<List<DocumentDTO>> getDocumentsBytype(@PathVariable Long jobApplicationId, @PathVariable DocumentType documentType){
        List<DocumentDTO> documentDTOS = documentService.getDocumentsByType(jobApplicationId,documentType);
        return ResponseEntity.ok(documentDTOS);
    }

    @GetMapping("/all")
    public  ResponseEntity<List<DocumentDTO>> getAllUserDocuments(){
        List<DocumentDTO> documentDTOS = documentService.getAllUserDocuments();
        return ResponseEntity.ok(documentDTOS);
    }

    @GetMapping("/all/type/{documentType}")
    public  ResponseEntity<List<DocumentDTO>> getAllUserDocumentsByType(@PathVariable DocumentType documentType){
        List<DocumentDTO> documentDTOS = documentService.getAllUserDocumentsByType(documentType);
        return ResponseEntity.ok(documentDTOS);
    }

    @PutMapping("/{id}")
    public  ResponseEntity<DocumentDTO> updateDocument(@PathVariable Long id, @Valid @RequestBody DocumentDTO documentDTO){
        DocumentDTO document= documentService.updateDocument(id,documentDTO);
        return ResponseEntity.ok(document);
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity<Void> deleteDocument(@PathVariable Long id){
        documentService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }

}
