
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private baseUrl = 'http://localhost:3000'; // URL do seu backend


  constructor(private http: HttpClient) { }

  getUsuario(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios`);
  }

  postUsuario(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios`, payload);
  }

  loginUsuario(payload:any): Observable<any>{
  return this.http.post(`${this.http.post}/autenticacao`,payload)
}
}
