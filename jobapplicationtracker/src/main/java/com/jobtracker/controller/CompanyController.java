package com.jobtracker.controller;

import com.jobtracker.dto.CompanyDTO;
import com.jobtracker.service.CompanyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {
    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping
    public ResponseEntity<CompanyDTO> createCompany(@Valid @RequestBody CompanyDTO companyDTO){
        CompanyDTO createdCompany = companyService.createCompany(companyDTO);
        return new ResponseEntity<>(createdCompany, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyDTO> getCompanyById(@PathVariable Long id){
        CompanyDTO companyDTO = companyService.getCompanyId(id);
        return ResponseEntity.ok(companyDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<List<CompanyDTO>> getAllCompanies(){
        List<CompanyDTO> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }

    @GetMapping
    public ResponseEntity<List<CompanyDTO>> searchCompaniesByNames(@RequestParam String name){
        List<CompanyDTO> companies = companyService.searchCompaniesByName(name);
        return ResponseEntity.ok(companies);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompanyDTO> updateCompany(@PathVariable Long id,@Valid @RequestBody CompanyDTO companyDTO ){
        CompanyDTO updatedCompany = companyService.updateCompany(id,companyDTO);
        return ResponseEntity.ok(updatedCompany);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CompanyDTO> deleteCompany(@PathVariable Long id){
        companyService.deteleCompany(id);
        return ResponseEntity.noContent().build();
    }
}
