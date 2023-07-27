import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
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

    const formValues: { email: string; password: string } = form.value;

    this.authService
      .login(formValues.email, formValues.password)
      .pipe(finalize(() => form.reset()))
      .subscribe(() => this.router.navigate(['/']));
  }
}
