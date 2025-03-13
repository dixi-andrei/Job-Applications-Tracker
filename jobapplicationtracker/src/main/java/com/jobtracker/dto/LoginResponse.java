package com.jobtracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private String token;
    private String username;
    private Long userId;
    private UserDTO user;


    public LoginResponse(String jwt, UserDTO userDTO) {
        this.token = jwt;
        this.username = userDTO.getUsername();
        this.userId = userDTO.getId();
        this.user = userDTO;
    }
    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    public Long getUserId() {
        return userId;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
