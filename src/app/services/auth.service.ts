import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials: any) {
    return this.http.post<any>('api/authenticate',
      JSON.stringify(credentials)).pipe(map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          return true;
        }
        return false;
      }))
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token)
      return false;

    return new JwtHelperService().isTokenExpired();
  }

  get currentUser() {
    const token = localStorage.getItem('token');
    if (!token)
      return null;

    return new JwtHelperService().decodeToken(token);
  }
}
