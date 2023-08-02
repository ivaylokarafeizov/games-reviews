import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.resetHttpError();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value as {
      email: string;
      password: string;
    };

    this.authService
      .login(email, password)
      .pipe(finalize(() => form.reset()))
      .subscribe(() => this.router.navigate(['/']));
  }
}
