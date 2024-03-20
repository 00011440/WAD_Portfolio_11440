import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Person } from '../models/person.model';
import { PersonDTO } from '../models/person-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  client = inject(HttpClient);
  link = 'http://localhost:5233/api/person/'

  constructor() { }

  getAll(){
    return this.client.get<Person[]>(this.link);
  }

  getById(id: number){
    return this.client.get<Person>(this.link + id);
  }

  create(person: PersonDTO){
    return this.client.post(this.link, person);
  }

  edit(id: number, person: PersonDTO){
    return this.client.put(this.link + id, person);
  }

  delete(id: number){
    return this.client.delete(this.link + id);
  }
}
