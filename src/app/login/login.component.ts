import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  invalidLogin!: boolean;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  signIn(credentials: any) {
    this.authService.login(credentials)
      .subscribe((result: any) => {
        if (result)
          this.router.navigate(['/']);
        else
          this.invalidLogin = true;
      });
  }
}
