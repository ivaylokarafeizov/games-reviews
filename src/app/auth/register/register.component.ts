import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { matchingPasswordsValidator } from '../../shared/validators/matching-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    username: ['', [Validators.minLength(5), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(5), Validators.required]],
    repeatPassword: [
      '',
      [
        Validators.required,
        matchingPasswordsValidator('password', 'repeatPassword'),
      ],
    ],
  });

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.resetHttpError();
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { username, email, password } = this.registerForm.value as {
      username: string;
      email: string;
      password: string;
    };

    this.authService
      .register(username, email, password)
      .subscribe(() => this.router.navigate(['/']));

    this.registerForm.reset();
  }
}
