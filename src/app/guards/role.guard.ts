import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role');

    if (role === 'admin') {
      return true;
    }

    // Si no es admin, redirige a /tasks
    this.router.navigate(['/tasks']);
    return false;
  }
}
