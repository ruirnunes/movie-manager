import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-authenticator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './authenticator.html',
  styleUrl: './authenticator.css',
})
export class AuthComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  isLoginMode = true;
  loading = false;
  errorMessage: string | null = null;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor() {
    // limpa mensagens de erro ao digitar
    this.form.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  // 🔄 alternar entre login e registo
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = null;
  }

  // 🚀 submit principal
  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const { email, password } = this.form.value;

    try {
      if (this.isLoginMode) {
        const { error } = await this.authService.login(email!, password!);
        if (error) {
          this.errorMessage = error.message || 'Invalid login credentials.';
          this.cdr.detectChanges();
          return;
        }
        this.router.navigate(['/dashboard']);
      } else {
        const { error } = await this.authService.signUp(email!, password!);
        if (error) {
          this.errorMessage = error.message || 'Email already registered.';
          this.cdr.detectChanges();
          return;
        }
        this.errorMessage = 'Account created.';
        this.isLoginMode = true;
        this.cdr.detectChanges();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.errorMessage = err.message;
      } else {
        this.errorMessage = 'An unexpected error occurred.';
      }
      this.cdr.detectChanges();
    } finally {
      this.loading = false;
    }
  }

  // 🔹 getters para template com @if()
  get showEmailRequiredError() {
    return !!(this.form.get('email')?.touched && this.form.get('email')?.errors?.['required']);
  }

  get showEmailFormatError() {
    return !!(this.form.get('email')?.touched && this.form.get('email')?.errors?.['email']);
  }

  get showPasswordRequiredError() {
    return !!(this.form.get('password')?.touched && this.form.get('password')?.errors?.['required']);
  }

  get showPasswordMinLengthError() {
    return !!(this.form.get('password')?.touched && this.form.get('password')?.errors?.['minlength']);
  }

  get showServerError() {
    return !!this.errorMessage;
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  // indica se é erro ou sucesso
  get isError() {
    return this.errorMessage != null && this.errorMessage !== 'Account created.';
  }

  get isSuccess() {
    return this.errorMessage === 'Account created.';
  }
}