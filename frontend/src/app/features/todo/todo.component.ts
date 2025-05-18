import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Task } from '../../shared/model/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, NgClass],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {
    name: '',
    description: '',
    completed: false
  };

  constructor(private TodoListService: TodoListService) {
    this.tasks = this.TodoListService.tasks;
  }

  ngOnInit(): void {
    this.TodoListService.getTasks().subscribe({
      next: data => {
        this.tasks = data;
        console.log(data);
      },         
      error: err => console.error("Erreur: ", err)
    });
  }

  addTodoForm(taskToAdd: Task) {
    this.TodoListService.setTask(taskToAdd).subscribe({
      next: createdTask => {
        console.log('Tâche créée avec succès :', createdTask);
        this.tasks.push(createdTask);
      },
      error: err => {
        console.error('Erreur lors de la création :', err);
      }
    });
  }

  remove(taskToRemove: Task) {
    console.log(taskToRemove)
    this.TodoListService.removeTask(taskToRemove).subscribe({
      next: createdTask => {
        console.log('Tâche supprimé avec succès :', taskToRemove);
        const indexTaskToRemove = this.tasks.indexOf(taskToRemove)
        this.tasks.splice(indexTaskToRemove, 1);
      },
      error: err => {
        console.error('Erreur lors de la suppression :', err);
      }
    });

  }


  complete(taskHasCompleted: Task) {
    this.TodoListService.completed(taskHasCompleted).subscribe({
          next: (response) => {
            console.log("Tache mise à jour avec succès ", response)
            taskHasCompleted.completed = true
            this.tasks.push()
          },
          error : (err) => {
            console.error(err)
          }
        });
  }


  onButtonClick(task: Task) {
    this.TodoListService.completed(task);
  }

}
