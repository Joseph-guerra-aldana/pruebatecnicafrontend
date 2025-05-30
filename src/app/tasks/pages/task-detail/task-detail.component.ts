import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html'
})
export class TaskDetailComponent implements OnInit {

  task: any;
  newStatus: string = '';

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getTaskById(id).subscribe({
        next: (data) => {
          this.task = data;
          this.newStatus = data.status; // inicializamos el status actual
        },
        error: (err) => console.error('Error al cargar la tarea', err)
      });
    }
  }

  updateStatus(): void {
    if (!this.task || !this.task._id) return;

    this.taskService.updateTaskStatus(this.task._id, this.newStatus).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => console.error('Error al actualizar', err)
    });
  }
}
