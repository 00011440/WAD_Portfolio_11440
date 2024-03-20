import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../../models/person.model';
import { TaskDTO } from '../../../models/todo-task-dto.model';
import { PersonService } from '../../../services/person.service';
import { TaskService } from '../../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  service = inject(TaskService);
  personService = inject(PersonService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  task: TaskDTO = {
    title: '',
    description: '',
    personId: 0
  }

  people: Person[] = [];
  
  taskId = 0;

  edit(){
    this.service.edit(this.taskId, this.task).subscribe(
      response => {
        this.router.navigate(['/tasks']);
      }
    )
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.taskId = params['id'];
        console.log(this.taskId);
      }
    )

    this.service.getById(this.taskId).subscribe(
      task => {
        this.task.title = task.title;
        this.task.description = task.description;
        this.task.personId = task.person.id;
      }
    )
    
    this.personService.getAll().subscribe(
      people => {
        this.people = people;
      }
    )
  }
}
