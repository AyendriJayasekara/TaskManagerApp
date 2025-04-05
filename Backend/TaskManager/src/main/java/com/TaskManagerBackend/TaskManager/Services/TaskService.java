package com.TaskManagerBackend.TaskManager.Services;
import com.TaskManagerBackend.TaskManager.Dto.TaskDto;

import java.util.List;


public interface TaskService {
    List<TaskDto> getAllTasks();

    List<TaskDto> getTasksByStatus(String status);

    TaskDto getTaskById(Long id);

    TaskDto createTask(TaskDto taskDto);

    TaskDto updateTask(Long id, TaskDto taskDTO);

    void deleteTask(Long id);
}
