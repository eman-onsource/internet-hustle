import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  public setCurrentUser(user: User) {
    this.user.next(user);
  }

  public getCurrentUser(): Observable<User> {
    return this.user.asObservable();
  }

  public login(username: string, password: string, remember: number) {
    return this.http.post<any>(`/api/login`, { username, password, remember });
  }

  public logout() {
    return this.http.post<any>(`/logout`, '');
  }

  private checkAuthStatus() {
    this.http.get(`/api/user`).subscribe(
      (response) => {
        this.user.next(response);
        this.isAuthenticatedSubject.next(true);
      },
      () => this.isAuthenticatedSubject.next(false)
    );
  }
}
