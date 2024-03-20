import { Injectable, inject } from '@angular/core';
import { ToDoTask } from '../models/todo-task.model';
import { TaskDTO } from '../models/todo-task-dto.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  client = inject(HttpClient);
  link = 'http://localhost:5233/api/task/'

  constructor() { }

  getAll(){
    return this.client.get<ToDoTask[]>(this.link);
  }

  getById(id: number){
    return this.client.get<ToDoTask>(this.link + id);
  }

  create(task: TaskDTO){
    return this.client.post(this.link, task);
  }

  edit(id: number, task: TaskDTO){
    return this.client.put(this.link + id, task);
  }

  delete(id: number){
    return this.client.delete(this.link + id);
  }
}
