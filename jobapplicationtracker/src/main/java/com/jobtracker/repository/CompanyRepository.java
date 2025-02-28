package com.jobtracker.repository;

import com.jobtracker.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.*;

@Repository
public interface CompanyRepository extends JpaRepository<Company,Long> {

    Optional<Company> findByName(String name);

    List<Company> findByNameContainingIgnoreCase(String name);

}
