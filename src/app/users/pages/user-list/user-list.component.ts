import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error(err)
    });
  }

  deleteUser(id: string): void {
    if (confirm('¿Seguro que desea eliminar el usuario?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  goToEdit(id: string): void {
    this.router.navigate(['/users/edit', id]);
  }
}
