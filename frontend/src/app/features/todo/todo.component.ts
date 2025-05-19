import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Task } from '../../shared/model/task.model';
import { FormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbDateStruct, NgbModal, NgbModalRef, NgbModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, NgClass, CommonModule,  NgbModule, ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {
    name: '',
    description: '',
    completed: false,
    datelimit: ''
  };


  currentTask!: Task;
  private modalRef?: NgbModalRef;
  public closeResult = '';
  newDateTime!: string;

  constructor(private TodoListService: TodoListService, private modalService: NgbModal) {
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

  isOverdue(task: Task): boolean {
    return !!task.datelimit && new Date(task.datelimit) < new Date();
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


  reported(taskHasCompleted: Task) {
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
  closeReporting(){

  }

  openReporting(content: TemplateRef<any>, task: Task): void {
    this.currentTask = task;


    if (task.datelimit) {
      this.newDateTime = new Date(task.datelimit)
        .toISOString()
        .substring(0, 19);
    }
  
    this.modalRef = this.modalService.open(content, {
      size: 'sm',
      backdrop: 'static',
    });
  
    this.modalRef.result
      .then((result: string) => { this.closeResult = `Fermé avec : ${result}`; })
      .catch((reason: any) => { this.closeResult = `Dismissed ${this.getDismissReason(reason)}`; });
  }


  onSaveReporting(modal: NgbModalRef | any, task: Task): void {
    if (!this.newDateTime) return;

    task.datelimit = this.newDateTime; 
    modal.close('report saved');
    
    this.TodoListService.reportingTask(task).subscribe({
      next: (response) => {
        console.log("La deadline à bien était reporté ", response)

      },
      error : (err) => {
        console.error(err)
      }
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'par la touche Echap';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'en cliquant en dehors';
    } else {
      return `avec : ${reason}`;
    }
  }

  onButtonClick(task: Task) {
    this.TodoListService.completed(task);
  }

}
