import { Component, inject } from '@angular/core';
import { PersonService } from '../../../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../../models/person.model';

@Component({
  selector: 'app-delete-person',
  standalone: true,
  imports: [],
  templateUrl: './delete-person.component.html',
  styleUrl: './delete-person.component.css'
})
export class DeletePersonComponent {
  service = inject(PersonService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  person: Person = {
    id: 0,
    firstName: '',
    lastName: ''
  }

  personId = 0;

  delete(){
    this.service.delete(this.personId).subscribe(
      result => {
        this.router.navigate(['/people']);
      }
    )
  }

  cancel(){
    this.router.navigate(['/people']);
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
