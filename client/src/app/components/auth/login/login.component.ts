import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../../services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public errMessage!: string | null;
  public loginForm!: FormGroup;
  public isAuthenticated$ = new Observable<boolean>;
  public isLoginBtnDisabled: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/readings']);
      }
    });
  }

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: ['']
    });
  }

  public login() {
    this.isLoginBtnDisabled = true;
    const { email, password, remember } = this.loginForm.value;

    this.authService.login(email, password, Number(remember)).subscribe({
      next: () => window.location.href = '/readings',
      error: () => {
        this.errMessage = 'Login error. Check username and password.';
        this.isLoginBtnDisabled = false;
      }
    });
  }

}
