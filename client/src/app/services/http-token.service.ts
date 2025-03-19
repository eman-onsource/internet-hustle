import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenService {

  constructor(private http: HttpClient) { }

  public getCsrfToken() {
    return this.http.get<any>(`/sanctum/csrf-cookie`, { observe: 'response' });
  }
}
