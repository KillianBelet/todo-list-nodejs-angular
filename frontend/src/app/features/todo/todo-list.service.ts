import { Injectable } from '@angular/core';
import { Task } from '../../shared/model/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  tasks : Task[] = []
  url = "http://localhost:5000/task/"

  constructor(private _httpClient: HttpClient) { }

  getTasks(): Observable<Task[]>{
    return this._httpClient.get<Task[]>(this.url + "getAll",{withCredentials: true })
  }

  completed(taskSelected: Task): Observable<Task> {
    console.log(taskSelected.completed + " tache que je recherche")
    const body =  { completed: true };

    return this._httpClient.patch<Task>(this.url + "modify/" + taskSelected._id, body, {withCredentials: true } )
    console.log("tache complété : " + taskSelected)
  }

  removeTask(taskSelected: Task): Observable<Task>{
    console.log(taskSelected)
    return this._httpClient.delete<Task>(this.url + "delete/" + taskSelected._id,{withCredentials: true })
  }

  setTask(taskCreated: Task): Observable<Task>{
    console.log(taskCreated)
    return this._httpClient.post<Task>(this.url + "create", taskCreated, {withCredentials: true })
  }
}
