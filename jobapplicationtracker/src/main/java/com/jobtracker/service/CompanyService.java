package com.jobtracker.service;

import com.jobtracker.dto.CompanyDTO;

import java.util.List;

public interface CompanyService {
    CompanyDTO createCompany(CompanyDTO companyDTO);
    CompanyDTO getCompanyId(Long id);
    List<CompanyDTO> getAllCompanies();
    List<CompanyDTO> searchCompaniesByName(String name);
    CompanyDTO updateCompany(Long id, CompanyDTO companyDTO);
    void deteleCompany(Long id);

}
