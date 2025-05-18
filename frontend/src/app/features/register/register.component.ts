import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username = '';
  password = '';
  confirm = '';
  errorMsg = '';

  constructor(
    private authservice: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMsg = '';

    if (this.password !== this.confirm) {
      this.errorMsg = 'Les mots de passe ne correspondent pas';
      return;
    }
    
    this.authservice.register(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => this.errorMsg = err.error?.message || 'Erreur lors de l\'inscription'
    });
    
  }
}
