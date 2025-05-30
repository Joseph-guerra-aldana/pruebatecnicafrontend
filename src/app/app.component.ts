import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentRoute: string = '';
  role: string | null = null;
  username: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
      this.loadUserData();
    });

    this.loadUserData();
  }

  loadUserData() {
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoginRoute(): boolean {
    return this.currentRoute === '/login';
  }
}
