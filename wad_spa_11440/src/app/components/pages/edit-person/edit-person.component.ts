import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonDTO } from '../../../models/person-dto.model';
import { PersonService } from '../../../services/person.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-person',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-person.component.html',
  styleUrl: './edit-person.component.css'
})
export class EditPersonComponent {
  service = inject(PersonService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  person: PersonDTO = {
    firstName: '',
    lastName: ''
  }

  personId = 0;

  edit(){
    this.service.edit(this.personId, this.person).subscribe(
      response => {
        this.router.navigate(['/people']);
      }
    )
  }

  ngOnInit(){
    this.route.params.subscribe(
      params => {
        this.personId = params['id'];
        console.log(this.personId);
      }
    )

    this.service.getById(this.personId).subscribe(
      person => {
        this.person = person;
      }
    )
  }
}
