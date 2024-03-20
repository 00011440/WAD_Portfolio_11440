import { Component, inject } from '@angular/core';
import { Person } from '../../../models/person.model';
import { PersonService } from '../../../services/person.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-people',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-people.component.html',
  styleUrl: './list-people.component.css'
})
export class ListPeopleComponent {
  service = inject(PersonService);
  router = inject(Router);
  people: Person[] = [];

  ngOnInit(): void {
    this.service.getAll().subscribe(
      people => {
        this.people = people;
      }
    )
  }
}
