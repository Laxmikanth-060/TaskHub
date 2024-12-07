package com.example.TaskManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.TaskManagement.model.Users;
import com.example.TaskManagement.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // For password hashing

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Create a new user with hashed password
    public Users createUser(Users user) {
        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public boolean authenticateUser(String email, String rawPassword) {
        // Retrieve user by email
        Users user = userRepository.getByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        // Check if the raw password matches the hashed password
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }
}
