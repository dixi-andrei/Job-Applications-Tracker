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

    public LoginResponse(String jwt, UserDTO userDTO) {
    }
}
