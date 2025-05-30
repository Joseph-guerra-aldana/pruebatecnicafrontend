import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksRoutingModule } from './tasks-routing.module';

import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    TaskDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule
  ]
})
export class TasksModule {}
