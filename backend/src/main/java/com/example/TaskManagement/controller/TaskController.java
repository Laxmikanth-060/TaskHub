package com.example.TaskManagement.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TaskManagement.model.Task;
import com.example.TaskManagement.service.TaskService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // Get a specific task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Create or update a task
@PostMapping
public ResponseEntity<Task> createOrUpdateTask(@RequestBody @Valid Task task, BindingResult result) {
    if (result.hasErrors()) {
        // Handle validation errors
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    Task savedTask = taskService.saveOrUpdateTask(task);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
}


@PutMapping("/{id}")
public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody @Valid Task task, BindingResult result) {
    if (result.hasErrors()){
        // Handle validation errors
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    task.setId(id); // Ensure the task has the correct ID for updating
    Task updatedTask = taskService.saveOrUpdateTask(task);
    return ResponseEntity.ok(updatedTask);
}


    // Delete a task by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        // System.out.println(id);
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
