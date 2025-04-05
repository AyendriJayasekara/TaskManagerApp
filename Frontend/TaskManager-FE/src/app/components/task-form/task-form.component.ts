import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h2>{{isEditMode ? 'Edit' : 'Create'}} Task</h2>

      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="needs-validation">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            formControlName="title"
            [ngClass]="{'is-invalid': submitted && f['title'].errors}"
          >
          <div class="invalid-feedback" *ngIf="submitted && f['title'].errors?.['required']">
            Title is required
          </div>
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea
            class="form-control"
            id="description"
            formControlName="description"
            rows="3"
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="status" class="form-label">Status</label>
          <select
            class="form-select"
            id="status"
            formControlName="status"
            [ngClass]="{'is-invalid': submitted && f['status'].errors}"
          >
            <option value="">Select Status</option>
            <option value="TO_DO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
          <div class="invalid-feedback" *ngIf="submitted && f['status'].errors?.['required']">
            Status is required
          </div>
        </div>

        <div class="mb-3">
          <label for="createdAt" class="form-label">Created At</label>
          <input
            type="datetime-local"
            class="form-control"
            id="createdAt"
            formControlName="createdAt"
            [ngClass]="{'is-invalid': submitted && f['createdAt'].errors}"
          >
          <div class="invalid-feedback" *ngIf="submitted && f['createdAt'].errors?.['required']">
            Created date is required
          </div>
        </div>

        <div class="mb-3">
          <button type="submit" class="btn btn-primary me-2">Save</button>
          <a routerLink="/tasks" class="btn btn-secondary">Cancel</a>
        </div>

        <div *ngIf="error" class="alert alert-danger">
          {{error}}
        </div>
      </form>
    </div>
  `,
  styles: []
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
