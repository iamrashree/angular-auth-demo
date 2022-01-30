import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials: any) {
    return this.http.post('/api/authenticate',
      JSON.stringify(credentials));
  }

  logout() {
  }

  isLoggedIn() {
    return false;
  }
}
