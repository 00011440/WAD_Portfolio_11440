import { Routes } from '@angular/router';
import { ListTasksComponent } from './components/pages/list-tasks/list-tasks.component';
import { ListPeopleComponent } from './components/pages/list-people/list-people.component';
import { CreatePersonComponent } from './components/pages/create-person/create-person.component';
import { CreateTaskComponent } from './components/pages/create-task/create-task.component';
import { DeletePersonComponent } from './components/pages/delete-person/delete-person.component';
import { DeleteTaskComponent } from './components/pages/delete-task/delete-task.component';
import { EditTaskComponent } from './components/pages/edit-task/edit-task.component';
import { EditPersonComponent } from './components/pages/edit-person/edit-person.component';

export const routes: Routes = [
    { path: 'tasks', component: ListTasksComponent },
    { path: 'people', component: ListPeopleComponent },
    { path: 'create-person', component: CreatePersonComponent },
    { path: 'create-task', component: CreateTaskComponent },
    { path: 'delete-person/:id', component: DeletePersonComponent },
    { path: 'delete-task/:id', component: DeleteTaskComponent },
    { path: 'edit-person/:id', component: EditPersonComponent },
    { path: 'edit-task/:id', component: EditTaskComponent },
];
