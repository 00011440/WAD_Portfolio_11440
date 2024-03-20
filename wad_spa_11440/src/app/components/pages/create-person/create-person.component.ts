import { Component, inject } from '@angular/core';
import { PersonService } from '../../../services/person.service';
import { Router } from '@angular/router';
import { PersonDTO } from '../../../models/person-dto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-person',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-person.component.html',
  styleUrl: './create-person.component.css'
})
export class CreatePersonComponent {
  service = inject(PersonService);
  router = inject(Router);

  person: PersonDTO = {
    firstName: '',
    lastName: ''
  }

  create(){
    this.service.create(this.person).subscribe(
      response => {
        this.router.navigate(['/people']);
      }
    )
  }
}
