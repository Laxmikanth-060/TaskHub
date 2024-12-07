package com.example.TaskManagement.controller;
import java.util.*;
import com.example.TaskManagement.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.TaskManagement.repository.UserRepository;

import com.example.TaskManagement.service.UserService;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/api/user")
public class UserController{     

    public final UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public UserController(UserService userService){
        this.userService=userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Users> userRegister(@RequestBody Users user){
        Users savedUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser); 
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        // Check if email exists
        var userByEmail = userRepository.getByEmail(email);

        if (userByEmail.isEmpty()) {
            return ResponseEntity.status(404).body("Email not found");
        }

        // Check if password matches
        var userByPassword = userRepository.getByPassword(password);

        if (userByPassword.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        // Ensure the email and password belong to the same user
        if (!userByEmail.get().getId().equals(userByPassword.get().getId())) {
            return ResponseEntity.status(401).body("Email and password do not match");
        }

        // If both conditions are satisfied
        return ResponseEntity.ok("Login successful!");
    }
}
