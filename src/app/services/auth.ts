import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { supabase } from '../supabase.client';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnDestroy {

  // 🔹 Injeta Router com inject()
  private router = inject(Router);

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private session: Session | null = null;
  private authListener: ReturnType<typeof supabase.auth.onAuthStateChange> | null = null;

  constructor() {
    this.init();
  }

  private async init() {
    // Obter sessão inicial
    const { data } = await supabase.auth.getSession();
    this.session = data.session;
    this.userSubject.next(data.session?.user ?? null);
    this.loadingSubject.next(false);

    // Listener de auth
    this.authListener = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        this.session = session;
        this.userSubject.next(session?.user ?? null);
      }
    );
  }

  // 🔹 Registo
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    return { data, error };
  }

  // 🔹 Login
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  }

  // 🔹 Logout
  async logout() {
    await supabase.auth.signOut();
    this.session = null;
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  // 🔹 Obter user atual (sync)
  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  // 🔹 Obter sessão
  getSession(): Session | null {
    return this.session;
  }

  // 🔹 Verificar se está autenticado
  isAuthenticated(): boolean {
    return !!this.session?.user;
  }

  // 🔹 Cleanup listener
  ngOnDestroy() {
    this.authListener?.data.subscription.unsubscribe();
  }
}