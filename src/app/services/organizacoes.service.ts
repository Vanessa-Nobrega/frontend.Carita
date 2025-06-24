import { environment } from '../../../environments/environments.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrganizacoesService {

  // private baseUrl = 'https://backend-carita-1.onrender.com'; // URL do seu backend


  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`
    };
  }

  getOrganizacoes(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/organizacoes`);
  }

  postOrganizacoes(payload: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/organizacoes`, payload, {
      headers: this.getAuthHeaders()});
  }
getOrganizacaoByUsuarioId(idUsuario: number | string): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/organizacoes/usuario/${idUsuario}`, {
      headers: this.getAuthHeaders()});
}

updateOrganizacao(id: number, payload: any): Observable<any> {
  return this.http.put<any>(`${environment.apiUrl}/organizacoes/${id}`, payload, {
      headers: this.getAuthHeaders()});
}
}
