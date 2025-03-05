package com.jobtracker.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;

import java.util.*;
@Entity
@Table(name = "users")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JobApplication> applications = new ArrayList<>();

    public String getUsername(){
        return username;
    }

    public String getPassword(){
        return password;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public List<JobApplication> getApplications() {
        return applications;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setApplications(List<JobApplication> applications) {
        this.applications = applications;
    }
}
