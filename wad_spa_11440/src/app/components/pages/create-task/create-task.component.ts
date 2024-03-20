import { Component, inject } from '@angular/core';
import { TaskDTO } from '../../../models/todo-task-dto.model';
import { Router } from '@angular/router';
import { Person } from '../../../models/person.model';
import { PersonService } from '../../../services/person.service';
import { TaskService } from '../../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  service = inject(TaskService);
  personService = inject(PersonService);
  router = inject(Router);

  task: TaskDTO = {
    title: '',
    description: '',
    personId: 0
  }

  people: Person[] = [];
  
  create(){
    this.service.create(this.task).subscribe(
      response => {
        this.router.navigate(['/tasks']);
      }
    )
  }

  ngOnInit(): void {
    this.personService.getAll().subscribe(
      people => {
        this.people = people;
      }
    )
  }
}
