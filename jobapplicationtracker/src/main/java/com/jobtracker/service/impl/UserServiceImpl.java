package com.jobtracker.service.impl;

import com.jobtracker.dto.LoginRequest;
import com.jobtracker.dto.LoginResponse;
import com.jobtracker.dto.UserDTO;
import com.jobtracker.exception.AuthenticationException;
import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.exception.UserAlreadyExistsException;
import com.jobtracker.model.User;
import com.jobtracker.repository.UserRepository;
import com.jobtracker.security.JwtUtil;
import com.jobtracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        if(userRepository.findByUsername(userDTO.getUsername()).isPresent()){
            throw new UserAlreadyExistsException("Username already exists");
        }

        if(userRepository.findByEmail(userDTO.getEmail()).isPresent()){
            throw new UserAlreadyExistsException("Email already exists");
        }

        User user = mapToEntity(userDTO);
        user.setPassword((passwordEncoder.encode(userDTO.getPassword())));
        User savedUser = userRepository.save(user);
        return mapToDto(savedUser);
    }

    @Override
    public LoginResponse loginUser(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            final String jwt = jwtUtil.generateToken(userDetails);

            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new AuthenticationException("User not found"));

            return new LoginResponse(jwt, mapToDto(user));
        }catch (Exception e){
            throw new AuthenticationException("Invalid username or password");
        }
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User","id",id));
        return mapToDto(user);
    }

    @Override
    public UserDTO getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(()-> new ResourceNotFoundException("User","username",username));
        return mapToDto(user);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User","id",id));

        user.setEmail(userDTO.getEmail());
        user.setUsername(userDTO.getUsername());

        if(userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()){
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        User updatedUser = userRepository.save(user);
        return mapToDto(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User","Id",id));
        userRepository.delete(user);
    }
    @Override
    public UserDTO getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return getUserByUsername(username);
    }

    private UserDTO mapToDto(User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setUsername(userDTO.getUsername());

        return userDTO;
    }
    private User mapToEntity(UserDTO userDTO){
        User user = new User();
        user.setId(userDTO.getId());
        user.setEmail(userDTO.getEmail());
        user.setUsername(userDTO.getUsername());

        return user;
    }
}
