import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  passwordFieldType: string = 'password';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        const token = res.access_token;

        localStorage.setItem('token', token);

        const decodedToken: any = jwtDecode(token);

        localStorage.setItem('role', decodedToken.role);
        localStorage.setItem('userId', decodedToken.sub);

        this.router.navigate(['/tasks']);
      },
      error: (err: any) => {
        this.error = 'Credenciales inválidas';
        console.error(err);
      }
    });
  }
}
