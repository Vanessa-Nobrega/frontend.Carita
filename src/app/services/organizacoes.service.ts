
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})

export class OrganizacoesService {
 
  private baseUrl = 'http://localhost:3000'; // URL do seu backend
 
 
  constructor(private http: HttpClient) { }
 
  getOrganizacoes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/organizacoes`);
  }
 
  postOrganizacoes(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/organizacoes`, payload);
  }
getOrganizacaoByUsuarioId(idUsuario: number | string): Observable<any> {
  return this.http.get(`${this.baseUrl}/organizacoes/usuario/${idUsuario}`);
}

updateOrganizacao(id: number, payload: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/organizacoes/${id}`, payload);
}
}