import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './features/todo/todo.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';


export const routes: Routes = [
    { path: 'todo-list', component: TodoComponent },     
    { path: 'login', component: LoginComponent },      
    { path: 'register', component: RegisterComponent },      
    { path: '', redirectTo: '/login', pathMatch: 'full' },  
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }