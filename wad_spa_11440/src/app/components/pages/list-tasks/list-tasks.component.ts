import { Component, inject } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router, RouterLink } from '@angular/router';
import { ToDoTask } from '../../../models/todo-task.model';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css'
})
export class ListTasksComponent {
  service = inject(TaskService);
  router = inject(Router);
  tasks: ToDoTask[] = [];

  ngOnInit(): void {
    this.service.getAll().subscribe(
      tasks => {
        this.tasks = tasks;
      }
    )
  }
}
