import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }
  
  deleteTask(id: string): void {
    if (confirm('¿Está seguro que desea eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => this.loadTasks(), 
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }
    
  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Error al cargar tareas', err);
      }
    });
  }
}
