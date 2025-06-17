
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { jwtDecode } from "jwt-decode";
 

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

 
  private baseUrl = 'http://localhost:3000';
 
 

  constructor(private http: HttpClient) { }

  getUsuario(): Observable<any> {

   
  const token: any = localStorage.getItem("token");
  if (token) {
    const decoded: any = jwtDecode(token);
    const userId = decoded.id || decoded.userId;
    console.log(userId);
  }
    return this.http.get(`${this.baseUrl}/usuarios`);

    
  }

  getUsuarioPorId(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/usuarios/${id}`);
}

  postUsuario(payload: any): Observable<any> {
    console.log("Payload enviado:", payload);
    return this.http.post(`${this.baseUrl}/usuarios`, payload);
  }

  updateUsuario(id: number, payload: any): Observable<any> {
  console.log('Atualizando usuário:', id, payload);
  return this.http.put(`${this.baseUrl}/usuarios/${id}`, payload);
}

  loginUsuario(payload:any): Observable<any>{
  return this.http.post(`${this.baseUrl}/autenticacao`,payload)
}
}
