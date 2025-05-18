import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';

  constructor(
    private authservice: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMsg = '';
    
    this.authservice.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/']),  
      error: err => this.errorMsg = err.error?.message || 'Erreur de connexion'
    });
    
  }

  
}
