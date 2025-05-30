import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {

  task: any = {
    title: '',
    description: '',
    status: 'pending',
    assignedTo: ''
  };

  users: any[] = [];
  role: string | null = '';

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');

    if (this.role === 'admin') {
      this.loadUsers();
    }
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  saveTask(): void {
    const taskToSave: any = {
      title: this.task.title,
      description: this.task.description,
      status: this.task.status
    };

    if (this.role === 'admin') {
      taskToSave.assignedTo = this.task.assignedTo;
    }

    this.taskService.createTask(taskToSave).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => console.error('Error al crear tarea', err)
    });  
  }
}
