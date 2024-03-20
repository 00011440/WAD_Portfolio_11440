import { Component, inject } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ToDoTask } from '../../../models/todo-task.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css'
})
export class DeleteTaskComponent {
  service = inject(TaskService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  taskId = 0;

  task: ToDoTask = {
    id: 0,
    title: '',
    description: '',
    person: {
      id: 0,
      firstName: '',
      lastName: ''
    }
  }
  delete(){
    this.service.delete(this.taskId).subscribe(
      result => {
        this.router.navigate(['/tasks']);
      }
    )
  }

  cancel(){
    this.router.navigate(['/tasks']);
  }

  ngOnInit(){
    this.route.params.subscribe(
      params => {
        this.taskId = params['id'];
        console.log(this.taskId);
      }
    )

    this.service.getById(this.taskId).subscribe(
      task => {
        this.task = task;
      }
    )
  }
}
