package com.jobtracker.service.impl;

import com.jobtracker.dto.CompanyDTO;
import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.model.Company;
import com.jobtracker.repository.CompanyRepository;
import com.jobtracker.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyServiceImpl(CompanyRepository companyRepository){
        this.companyRepository  = companyRepository;

    }
    @Override
    public CompanyDTO createCompany(CompanyDTO companyDTO) {
        Company company = mapToEntity(companyDTO);
        Company savedCompany = companyRepository.save(company);
        return mapToDto(savedCompany);
    }

    @Override
    public CompanyDTO getCompanyId(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company","id",id));
        return mapToDto(company);


    }

    @Override
    public List<CompanyDTO> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        return companies.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CompanyDTO> searchCompaniesByName(String name) {
        List<Company> companies = companyRepository.findByNameContainingIgnoreCase(name);
        return companies.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public CompanyDTO updateCompany(Long id, CompanyDTO companyDTO) {
        Company company = companyRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Company","id",id));

        company.setName(companyDTO.getName());
        company.setWebsite(companyDTO.getWebsite());
        company.setLocation(companyDTO.getLocation());
        company.setNotes(companyDTO.getNotes());

        Company updatedCompany = companyRepository.save(company);
        return mapToDto(updatedCompany);
    }

    @Override
    public void deteleCompany(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Company","id",id));
        companyRepository.delete(company);
    }

    private CompanyDTO mapToDto(Company company){
        CompanyDTO companyDTO = new CompanyDTO();
        companyDTO.setId(company.getId());
        companyDTO.setName(company.getName());
        companyDTO.setWebsite(companyDTO.getWebsite());
        companyDTO.setLocation(companyDTO.getLocation());
        companyDTO.setNotes(companyDTO.getNotes());
        return companyDTO;
    }

    private Company mapToEntity(CompanyDTO companyDTO) {
        Company company = new Company();
        company.setId(companyDTO.getId());
        company.setName(companyDTO.getName());
        company.setWebsite(companyDTO.getWebsite());
        company.setLocation(companyDTO.getLocation());
        company.setNotes(companyDTO.getNotes());
        return company;
    }
}
