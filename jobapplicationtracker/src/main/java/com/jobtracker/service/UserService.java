package com.jobtracker.service;

import com.jobtracker.dto.LoginRequest;
import com.jobtracker.dto.LoginResponse;
import com.jobtracker.dto.UserDTO;

public interface  UserService {
    UserDTO registerUser(UserDTO userDTO);
    LoginResponse loginUser(LoginRequest loginRequest);
    UserDTO getUserById(Long id);
    UserDTO getUserByUsername(String username);
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
    UserDTO getCurrentUser();
}
