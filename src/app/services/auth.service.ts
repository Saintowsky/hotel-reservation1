import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private userSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    const userName = localStorage.getItem('userName');
    if (userName) {
      this.userSubject.next(userName);
    }
  }

  login(credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        console.log('Login response:', response);
        localStorage.setItem('token', response.token);
        
        const userEmail = credentials.email;
        localStorage.setItem('userName', userEmail);
        this.userSubject.next(userEmail);
      })
    );
  }

register(user: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, user);
}

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): Observable<string | null> {
    return this.userSubject.asObservable();
  }
}