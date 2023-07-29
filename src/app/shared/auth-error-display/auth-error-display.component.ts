import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth-error-display',
  templateUrl: './auth-error-display.component.html',
  styleUrls: ['./auth-error-display.component.css'],
})
export class AuthErrorDisplayComponent {
  constructor(public authService: AuthService) {}
}
