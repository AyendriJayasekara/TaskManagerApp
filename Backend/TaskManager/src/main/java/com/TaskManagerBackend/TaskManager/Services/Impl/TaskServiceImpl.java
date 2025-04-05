package com.TaskManagerBackend.TaskManager.Services.Impl;

import com.TaskManagerBackend.TaskManager.Dto.TaskDto;
import com.TaskManagerBackend.TaskManager.Services.TaskService;
import com.TaskManagerBackend.TaskManager.exceptions.EntityNotFoundException;
import com.TaskManagerBackend.TaskManager.model.Task;
import com.TaskManagerBackend.TaskManager.repository.TaskRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


    @Service
    public class TaskServiceImpl implements TaskService {

        private final TaskRepository taskRepository;

        @Autowired
        public TaskServiceImpl(TaskRepository taskRepository) {
            this.taskRepository = taskRepository;
        }


        @Override
        public List<TaskDto> getAllTasks() {
            return taskRepository.findAll().stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        }

        @Override
        public List<TaskDto> getTasksByStatus(String status) {
            return taskRepository.findByStatus(status).stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        }

        @Override
        public TaskDto getTaskById(Long id) {
            Task task = taskRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));
            return convertToDTO(task);
        }

        @Override
        public TaskDto createTask(TaskDto taskDTO) {
            Task task = convertToEntity(taskDTO);
            Task savedTask = taskRepository.save(task);
            return convertToDTO(savedTask);
        }

        @Override
        public TaskDto updateTask(Long id, TaskDto taskDTO) {
            Task existingTask = taskRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));

            // Only update fields that are sent
            if (taskDTO.getTitle() != null) {
                existingTask.setTitle(taskDTO.getTitle());
            }
            if (taskDTO.getDescription() != null) {
                existingTask.setDescription(taskDTO.getDescription());
            }
            if (taskDTO.getStatus() != null) {
                existingTask.setStatus(taskDTO.getStatus());
            }

            Task updatedTask = taskRepository.save(existingTask);
            return convertToDTO(updatedTask);
        }

        @Override
        public void deleteTask(Long id) {
            if (!taskRepository.existsById(id)) {
                throw new EntityNotFoundException("Task not found with id: " + id);
            }
            taskRepository.deleteById(id);
        }

        private TaskDto convertToDTO(Task task) {
            TaskDto taskDto = new TaskDto();
            taskDto.setId(task.getId());
            taskDto.setTitle(task.getTitle());
            taskDto.setDescription(task.getDescription());
            taskDto.setStatus(task.getStatus());
            taskDto.setCreatedAt(task.getCreatedAt());
            return taskDto;
        }


        private Task convertToEntity(TaskDto taskDTO) {
            Task task = new Task();
            task.setId(taskDTO.getId());
            task.setTitle(taskDTO.getTitle());
            task.setDescription(taskDTO.getDescription());
            task.setStatus(taskDTO.getStatus());
            task.setCreatedAt(taskDTO.getCreatedAt());
            return task;
        }
    }


