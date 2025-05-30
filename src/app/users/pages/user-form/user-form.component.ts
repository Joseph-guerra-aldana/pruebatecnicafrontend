import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  user: any = { email: '', password: '', role: 'normal' };
  id: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.userService.getUserById(this.id).subscribe({
        next: (data) => this.user = data,
        error: (err) => console.error(err)
      });
    }
  }

  save(): void {
    if (this.id) {
      this.userService.updateUser(this.id, this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.createUser(this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
