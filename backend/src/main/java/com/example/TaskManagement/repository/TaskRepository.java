package com.example.TaskManagement.repository;

import com.example.TaskManagement.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // You can add custom query methods if needed
}
