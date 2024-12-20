package com.example.TaskManagement.repository;

import java.util.Optional;

import com.example.TaskManagement.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface  UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> getByEmail(String email);
    Optional<Users> getByPassword(String password);
}
