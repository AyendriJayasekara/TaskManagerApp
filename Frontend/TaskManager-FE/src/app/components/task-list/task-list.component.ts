import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h2>Task List</h2>

      <div class="mb-3">
        <label for="statusFilter" class="form-label">Filter by Status:</label>
        <select id="statusFilter" class="form-select" [(ngModel)]="selectedStatus" (change)="filterTasks()">
          <option value="">All</option>
          <option value="TO_DO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>

      <div class="mb-3">
        <a [routerLink]="['/tasks/new']" class="btn btn-primary">Create New Task</a>
      </div>

      <div class="row">
        <div class="col-md-4 mb-3" *ngFor="let task of tasks">
          <div class="card task-card">
            <div class="card-body">
              <h5 class="card-title">{{task.title}}</h5>
              <p class="card-text">{{task.description}}</p>
              <div class="badge status-badge" [ngClass]="{
                'bg-warning': task.status === 'TO_DO',
                'bg-info': task.status === 'IN_PROGRESS',
                'bg-success': task.status === 'DONE'
              }">{{task.status}}</div>
              <div class="mt-2">
                <small class="text-muted">
                  Created: {{task.createdAt | date:'medium'}}
                </small>
              </div>
              <div class="mt-3">
                <a [routerLink]="['/tasks', task.id]" class="btn btn-sm btn-info me-2">Edit</a>
                <button class="btn btn-sm btn-danger" (click)="deleteTask(task.id)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  selectedStatus: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    if (this.selectedStatus) {
      this.taskService.getTasksByStatus(this.selectedStatus).subscribe({
        next: (tasks) => this.tasks = tasks,
        error: (error) => console.error('Error loading tasks:', error)
      });
    } else {
      this.taskService.getAllTasks().subscribe({
        next: (tasks) => this.tasks = tasks,
        error: (error) => console.error('Error loading tasks:', error)
      });
    }
  }

  filterTasks(): void {
    this.loadTasks();
  }

  deleteTask(id: number | undefined): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== id);
        },
        error: (error) => console.error('Error deleting task:', error)
      });
    }
  }
}
