import { Person } from "./person.model";

export interface ToDoTask{
    id: number;
    title: string;
    description: string;
    person: Person;
}