import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="header-section">
        <h2 class="display-6 mb-3">Task Manager</h2>
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="status-filter">
              <label for="statusFilter" class="form-label small fw-bold">Filter by Status:</label>
              <select 
                id="statusFilter" 
                class="form-select form-select-sm shadow-sm" 
                [(ngModel)]="selectedStatus" 
                (change)="filterTasks()"
              >
                <option value="">All Tasks</option>
                <option value="TO_DO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          </div>
          <div class="col-md-6 text-md-end mt-3 mt-md-0">
            <a [routerLink]="['/tasks/new']" class="btn btn-primary btn-sm">
              <i class="fas fa-plus me-2"></i>Create New Task
            </a>
          </div>
        </div>
      </div>

      <div class="row" [@taskListAnimation]="tasks.length">
        <div class="col-md-4 mb-4" *ngFor="let task of tasks" [@taskAnimation]>
          <div class="card task-card h-100">
            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="card-title text-truncate mb-0">{{task.title}}</h5>
                <div class="badge status-badge" [ngClass]="{
                  'bg-warning': task.status === 'TO_DO',
                  'bg-info': task.status === 'IN_PROGRESS',
                  'bg-success': task.status === 'DONE'
                }">{{task.status}}</div>
              </div>
              
              <p class="card-text flex-grow-1 mb-3">{{task.description}}</p>
              
              <div class="task-footer">
                <div class="created-date mb-3">
                  <small class="text-muted">
                    <i class="far fa-calendar-alt me-2"></i>
                    {{task.createdAt | date:'medium'}}
                  </small>
                </div>
                
                <div class="action-buttons">
                  <a [routerLink]="['/tasks', task.id]" class="btn btn-action btn-edit me-2">
                    <i class="fas fa-edit me-1"></i>
                    Edit
                  </a>
                  <button class="btn btn-action btn-delete" (click)="confirmDelete(task)">
                    <i class="fas fa-trash-alt me-1"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div *ngIf="tasks.length === 0" class="text-center py-5" [@emptyAnimation]>
        <i class="fas fa-tasks fa-3x text-muted mb-3"></i>
        <h3 class="text-muted">No tasks found</h3>
        <p class="text-muted">Create a new task to get started!</p>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --dark-bg: #1a1f2c;
      --darker-bg: #151922;
      --card-bg: #232838;
      --input-bg: #2a303f;
      --text-primary: #ffffff;
      --text-secondary: #b3b9c5;
      --border-color: #2d3446;
      --primary-color: #3699ff;
      --primary-hover: #4aa3ff;
      --danger-color: #f64e60;
      --danger-hover: #ff5c75;
    }

    .container {
      color: var(--text-primary);
    }

    .header-section {
      background: var(--darker-bg);
      padding: 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      border: 1px solid var(--border-color);
    }

    .task-card {
      background-color: var(--card-bg);
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
      border-radius: 8px;
    }

    .task-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
    }

    .card-title {
      color: var(--text-primary);
      font-size: 1.1rem;
      max-width: 70%;
    }

    .card-text {
      color: var(--text-secondary);
      font-size: 0.9rem;
      min-height: 60px;
    }

    .created-date {
      font-size: 0.85rem;
    }

    .action-buttons {
      display: flex;
      gap: 10px;
      padding-top: 10px;
      border-top: 1px solid var(--border-color);
    }

    .btn-action {
      flex: 1;
      font-size: 0.85rem;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .btn-edit {
      background-color: var(--input-bg);
      color: var(--primary-color);
      border: 1px solid var(--border-color);
    }

    .btn-edit:hover {
      background-color: var(--primary-color);
      color: white;
      transform: translateY(-2px);
    }

    .btn-delete {
      background-color: var(--input-bg);
      color: var(--danger-color);
      border: 1px solid var(--border-color);
    }

    .btn-delete:hover {
      background-color: var(--danger-color);
      color: white;
      transform: translateY(-2px);
    }

    .status-badge {
      padding: 0.4em 1em;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .bg-warning {
      background-color: #ffa800 !important;
      color: #ffffff;
    }

    .bg-info {
      background-color: #3699ff !important;
      color: #ffffff;
    }

    .bg-success {
      background-color: #0bb783 !important;
      color: #ffffff;
    }

    .form-select {
      background-color: var(--input-bg);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
    }

    .form-select:focus {
      background-color: var(--input-bg);
      border-color: var(--primary-color);
      box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.25);
    }

    .text-muted {
      color: var(--text-secondary) !important;
    }

    /* Task card hover effects */
    .task-card:hover .btn-action {
      transform: translateY(-2px);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .action-buttons {
        flex-direction: column;
        gap: 8px;
      }

      .btn-action {
        width: 100%;
      }
    }
  `],
  animations: [
    trigger('taskListAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('taskAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ]),
    trigger('buttonAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('0.2s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('selectAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('0.2s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('emptyAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
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

  confirmDelete(task: Task): void {
    if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
      this.deleteTask(task.id);
    }
  }

  deleteTask(id: number | undefined): void {
    if (!id) return;

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      },
      error: (error) => console.error('Error deleting task:', error)
    });
  }
}
