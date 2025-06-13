
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  private baseUrl = 'http://localhost:3000'; // URL do seu backend
 
  constructor(private http: HttpClient) { }
 
  getDados(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuario`);
  }
 
  postDados(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuario`, payload);
  }
}