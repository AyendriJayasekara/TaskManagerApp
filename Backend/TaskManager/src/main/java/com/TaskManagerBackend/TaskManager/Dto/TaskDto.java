package com.TaskManagerBackend.TaskManager.Dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;


public class TaskDto {
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must be less than 255 characters")
    private String title;

    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;

    @NotBlank(message = "Status is required")
    private String status;

    private LocalDateTime createdAt;


    public TaskDto() {

    }

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}


    public @NotBlank(message = "Title is required") @Size(max = 255, message = "Title must be less than 255 characters") String getTitle() {
        return title;
    }
    public void setTitle(@NotBlank(message = "Title is required") @Size(max = 255, message = "Title must be less than 255 characters") String title) {
        this.title = title;
    }

    public @Size(max = 1000, message = "Description must be less than 1000 characters") String getDescription() {
        return description;
    }

    public void setDescription(@Size(max = 1000, message = "Description must be less than 1000 characters") String description) {
        this.description = description;
    }

    public @NotBlank(message = "Status is required") String getStatus() {
        return status;
    }

    public void setStatus(@NotBlank(message = "Status is required") String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt) {this.createdAt = createdAt;}
}
