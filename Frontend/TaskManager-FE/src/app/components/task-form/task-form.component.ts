import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-lg border-0" [@formAnimation]>
            <div class="card-header">
              <h5 class="card-title mb-0">
                <i class="fas fa-tasks me-2"></i>
                {{isEditMode ? 'Edit' : 'Create'}} Task
              </h5>
            </div>
            <div class="card-body">
              <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="needs-validation">
                <!-- Title Field -->
                <div class="form-group mb-3" [@inputAnimation]>
                  <label for="title" class="form-label small fw-bold">
                    Title <span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="title"
                    formControlName="title"
                    [ngClass]="{'is-invalid': submitted && f['title'].errors}"
                    placeholder="Enter task title"
                  >
                  <div class="invalid-feedback small" *ngIf="submitted && f['title'].errors?.['required']">
                    Title is required
                  </div>
                </div>

                <!-- Description Field -->
                <div class="form-group mb-3" [@inputAnimation]>
                  <label for="description" class="form-label small fw-bold">Description</label>
                  <textarea
                    class="form-control form-control-sm"
                    id="description"
                    formControlName="description"
                    rows="3"
                    style="resize: none;"
                    placeholder="Enter task description"
                  ></textarea>
                </div>

                <!-- Status and Date Row -->
                <div class="row mb-3">
                  <div class="col-md-6" [@inputAnimation]>
                    <label for="status" class="form-label small fw-bold">
                      Status <span class="text-danger">*</span>
                    </label>
                    <select
                      class="form-select form-select-sm"
                      id="status"
                      formControlName="status"
                      [ngClass]="{'is-invalid': submitted && f['status'].errors}"
                    >
                      <option value="">Select Status</option>
                      <option value="TO_DO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="DONE">Done</option>
                    </select>
                    <div class="invalid-feedback small" *ngIf="submitted && f['status'].errors?.['required']">
                      Status is required
                    </div>
                  </div>

                  <div class="col-md-6" [@inputAnimation]>
                    <label for="createdAt" class="form-label small fw-bold">
                      Created At <span class="text-danger">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      class="form-control form-control-sm"
                      id="createdAt"
                      formControlName="createdAt"
                      [ngClass]="{'is-invalid': submitted && f['createdAt'].errors}"
                    >
                    <div class="invalid-feedback small" *ngIf="submitted && f['createdAt'].errors?.['required']">
                      Date is required
                    </div>
                  </div>
                </div>

                <!-- Error Alert -->
                <div *ngIf="error" class="alert alert-danger alert-sm py-2 mb-3" [@errorAnimation]>
                  <i class="fas fa-exclamation-circle me-2"></i>
                  <small>{{error}}</small>
                </div>

                <!-- Form Actions -->
                <div class="d-flex gap-2 justify-content-end" [@buttonAnimation]>
                  <a routerLink="/tasks" class="btn btn-outline-light btn-sm px-3">
                    Cancel
                  </a>
                  <button type="submit" class="btn btn-primary btn-sm px-3">
                    {{isEditMode ? 'Update' : 'Create'}}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 100%;
    }

    /* Dark theme colors */
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
    }

    /* Global styles */
    .container {
      color: var(--text-primary);
    }

    /* Card styles */
    .card {
      background-color: var(--card-bg);
      border-radius: 8px;
      border: 1px solid var(--border-color);
    }

    .card-header {
      background: var(--darker-bg);
      border-bottom: 1px solid var(--border-color);
      color: var(--text-primary);
      padding: 1rem;
    }

    .card-body {
      background-color: var(--card-bg);
      padding: 1.5rem;
    }

    /* Form controls */
    .form-control, .form-select {
      background-color: var(--input-bg);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      border-radius: 4px;
      font-size: 0.875rem;
    }

    .form-control:focus, .form-select:focus {
      background-color: var(--input-bg);
      border-color: var(--primary-color);
      box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.25);
      color: var(--text-primary);
    }

    .form-control::placeholder {
      color: var(--text-secondary);
    }

    /* Labels */
    .form-label {
      color: var(--text-primary);
      font-weight: 500;
      margin-bottom: 0.3rem;
    }

    /* Select dropdown */
    .form-select {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
    }

    .form-select option {
      background-color: var(--input-bg);
      color: var(--text-primary);
    }

    /* Buttons */
    .btn {
      font-size: 0.875rem;
      font-weight: 500;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .btn:hover {
      transform: translateY(-1px);
    }

    .btn-primary {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
    }

    .btn-primary:hover {
      background-color: var(--primary-hover);
      border-color: var(--primary-hover);
    }

    .btn-outline-light {
      color: var(--text-primary);
      border-color: var(--border-color);
    }

    .btn-outline-light:hover {
      background-color: var(--input-bg);
      color: var(--text-primary);
      border-color: var(--border-color);
    }

    /* Alert */
    .alert-sm {
      font-size: 0.875rem;
      border-radius: 4px;
      background-color: rgba(220, 53, 69, 0.1);
      border-color: rgba(220, 53, 69, 0.2);
      color: #ff6b6b;
    }

    /* Invalid feedback */
    .invalid-feedback {
      color: #ff6b6b;
      font-size: 0.75rem;
    }

    /* Custom scrollbar for textarea */
    textarea::-webkit-scrollbar {
      width: 6px;
    }

    textarea::-webkit-scrollbar-track {
      background: var(--input-bg);
    }

    textarea::-webkit-scrollbar-thumb {
      background: var(--border-color);
      border-radius: 3px;
    }

    textarea::-webkit-scrollbar-thumb:hover {
      background: var(--text-secondary);
    }
  `],
  animations: [
    trigger('formAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('inputAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-10px)' }),
        animate('0.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('buttonAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(5px)' }),
        animate('0.2s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('errorAnimation', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('0.2s ease-out', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        animate('0.2s ease-in', style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  submitted = false;
  error = '';
  taskId?: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      status: ['', [Validators.required]],
      createdAt: [new Date().toISOString().slice(0, 16), [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.taskId) {
      this.isEditMode = true;
      this.loadTask();
    }
  }

  get f() {
    return this.taskForm.controls;
  }

  loadTask(): void {
    if (!this.taskId) return;

    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          status: task.status,
          createdAt: task.createdAt ? new Date(task.createdAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
        });
      },
      error: (error) => {
        console.error('Error loading task:', error);
        this.error = 'Error loading task. Please try again.';
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    if (this.taskForm.invalid) {
      return;
    }

    const formValue = this.taskForm.value;
    const task: Task = {
      ...formValue,
      createdAt: new Date(formValue.createdAt)
    };

    const request = this.isEditMode && this.taskId
      ? this.taskService.updateTask(this.taskId, task)
      : this.taskService.createTask(task);

    request.subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.error('Error saving task:', error);
        this.error = 'Error saving task. Please try again.';
      }
    });
  }
}
