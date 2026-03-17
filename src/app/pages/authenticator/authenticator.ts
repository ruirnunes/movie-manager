import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-authenticator',
  imports: [FormsModule],
  templateUrl: './authenticator.html',
  styleUrl: './authenticator.css',
})
export class AuthComponent {

  isLoginMode = true;
  email = '';
  password = '';
  name = '';
  message = '';

  private apiUrl = `${environment.apiUrl}/users`;

  private http = inject(HttpClient);
  private router = inject(Router);

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.message = '';
  }

  async submit() {

    if (!this.email || !this.password || (!this.isLoginMode && !this.name)) {
      this.message = 'Preencha todos os campos.';
      return;
    }

    try {

      if (this.isLoginMode) {

        const users: User[] = await firstValueFrom(
          this.http.get<User[]>(`${this.apiUrl}?email=${this.email}&password=${this.password}`)
        );

        if (users.length) {
          this.message = 'Login efetuado com sucesso!';
          this.router.navigate(['/dashboard']);
        } else {
          this.message = 'Credenciais inválidas.';
        }

      } else {

        const newUser: User = {
          id: crypto.randomUUID(),
          name: this.name,
          email: this.email,
          password: this.password
        };

        await firstValueFrom(
          this.http.post<User>(this.apiUrl, newUser)
        );

        this.message = 'Conta criada com sucesso! Pode agora fazer login.';
        this.toggleMode();
      }

    } catch (err) {
      console.error(err);
      this.message = 'Ocorreu um erro. Tente novamente.';
    }

  }

}